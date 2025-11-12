import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
 },
  description: { 
    type: String, 
    required: true 
 },
  category: { 
    type: String, 
    enum: ["Family-Floaters", "Term-Life", "Four-Wheeler", "Home", "Travel", "Individual-Health", "Whole-Life", "Two-Wheeler"], 
    required: true 
 },
  claimAmount: { 
    type: Number, 
    required: true 
 },
  monthlyPremium: { 
    type: Number, 
    required: true 
 },
  image: {
    url: { 
        type: String, 
        required: true 
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Policy = mongoose.model("Policy", policySchema);
