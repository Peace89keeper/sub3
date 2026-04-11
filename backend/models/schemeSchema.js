import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  ministry: { type: String, required: true },
  benefit: { type: String, required: true },
  deadline: { type: String },
  impactScore: { type: Number },
  isNewlyLaunched: { type: Boolean, default: false }, // Fixed from 'isNew'
  matchReason: { type: String },
  targetState: { type: String, default: "All" }, 
  targetCategory: { type: String, default: "All" }
});

export const Scheme = mongoose.model("Scheme", schemeSchema);