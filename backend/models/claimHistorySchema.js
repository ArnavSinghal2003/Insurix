import mongoose from "mongoose";

const claimHistorySchema = new mongoose.Schema({
  policy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Policy",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase",
    required: true
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String
  }
});

export const claimHistory = mongoose.model("claimHistory", claimHistorySchema);

