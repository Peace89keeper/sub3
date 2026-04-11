import { Scheme } from "../models/schemeSchema.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch all schemes for the initial dashboard load
export const getAllSchemes = async (req, res, next) => {
  try {
    const schemes = await Scheme.find();
    res.status(200).json({ success: true, schemes });
  } catch (error) {
    next(error);
  }
};

// The Hybrid AI Filter
export const analyzeSchemes = async (req, res, next) => {
  try {
    const { userProfile } = req.body;

    if (!userProfile) {
      return res.status(400).json({ success: false, message: "User profile missing." });
    }

    // Step 1: Pre-filter with MongoDB to save AI costs
    const preFilteredSchemes = await Scheme.find({
      $or: [{ targetState: "All" }, { targetState: userProfile.state || "All" }]
    });

    if (preFilteredSchemes.length === 0) {
      return res.status(200).json({ success: true, matchedSchemes: [] });
    }

    // Step 2: Semantic Matching with Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

    const prompt = `
      You are an expert government scheme matcher. 
      User Profile: ${JSON.stringify(userProfile)}
      Available Schemes: ${JSON.stringify(preFilteredSchemes)}
      
      Analyze the semantic relationship between the user's details and the schemes.
      Return STRICTLY a JSON array of the 'customId' strings for the best matches. 
      Do not include markdown or explanations. Example: ["SM-104", "SM-211"]
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const matchedSchemeIds = JSON.parse(cleanJsonString);

    // Step 3: Return the filtered objects back to React
    const finalMatches = preFilteredSchemes.filter(scheme => 
      matchedSchemeIds.includes(scheme.customId)
    );

    res.status(200).json({ success: true, matchedSchemes: finalMatches });

  } catch (error) {
    console.error("AI Logic Error:", error);
    next(error);
  }
};

// CREATE NEW SCHEME LOGIC
export const createScheme = async (req, res, next) => {
  try {
    // 1. Grab the data the frontend form sent us
    const schemeData = req.body;

    // 2. Strict Validation: Check if the mandatory fields exist
    if (!schemeData.customId || !schemeData.title || !schemeData.ministry || !schemeData.benefit) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields (customId, title, ministry, benefit)." 
      });
    }

    // 3. Save it to the MongoDB warehouse
    const newScheme = await Scheme.create(schemeData);

    // 4. Send a success receipt back to React
    res.status(201).json({
      success: true,
      message: "Scheme successfully published to the database!",
      scheme: newScheme
    });

  } catch (error) {
    // If customId already exists, MongoDB throws a duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "A scheme with this customId already exists." });
    }
    console.error("Create Scheme Error:", error);
    next(error);
  }
};