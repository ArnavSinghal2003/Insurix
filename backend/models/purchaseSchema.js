import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
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
  claimStatus: {
    type: String,
    enum: ["Not Initiated", "Under Process", "Approved", "Rejected"],
    default: "Not Initiated"
  },
  claimRequestedAt: {
    type: Date
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  }
});


export const Purchase = mongoose.model("Purchase", purchaseSchema);
