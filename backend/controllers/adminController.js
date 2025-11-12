import { Policy } from "../models/policySchema.js";
import { Request } from "../models/requestSchema.js";
import { Purchase } from "../models/purchaseSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import fs from "fs";
import path from "path"
// import { ClaimHistory } from "../models/claimHistorySchema.js"; // ✅ Import new schema


export const createPolicy = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category, claimAmount, monthlyPremium } = req.body;

  if (!req.file) {
    return next(new ErrorHandler("Policy image is required", 400));
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/policyImages/${req.file.filename}`;

  const policy = await Policy.create({
    title,
    description,
    category,
    claimAmount,
    monthlyPremium,
    image: { url: imageUrl },
    createdBy: req.user._id
  });

  res.status(201).json({
    success: true,
    message: "Policy created successfully",
    policy
  });
});

export const deletePolicy = catchAsyncErrors(async (req, res, next) => {
  const { policyId } = req.params;

  const policy = await Policy.findById(policyId);
  if (!policy) {
    return next(new ErrorHandler("Policy not found", 404));
  }

  // Delete image file from local storage
  const imagePath = path.join(process.cwd(), "uploads", "policyImages", path.basename(policy.image.url));
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  await policy.deleteOne();

  res.status(200).json({
    success: true,
    message: "Policy deleted successfully"
  });
})

export const getAllClaimRequests = catchAsyncErrors(async (req, res, next) => {
  const requests = await Request.find().populate("policy user purchase");

  res.status(200).json({
    success: true,
    count: requests.length,
    requests
  });
});

export const processClaimRequest = catchAsyncErrors(async (req, res, next) => {
  const { purchaseId } = req.params;
  const { action } = req.body; // "Approved" or "Rejected"

  const purchase = await Purchase.findById(purchaseId);
  
  if (!purchase) {
    return next(new ErrorHandler("Purchase not found", 404));
  }

  if (!["Approved", "Rejected"].includes(action)) {
    return next(new ErrorHandler("Invalid action", 400));
  }

  purchase.claimStatus = action;
  await purchase.save();

  res.status(200).json({
    success: true,
    message: `Claim ${action.toLowerCase()} successfully`,
    purchase
  });
});


// export const processClaimRequest = catchAsyncErrors(async (req, res, next) => {
//   const { purchaseId } = req.params;
//   const { action } = req.body; // "Approved" or "Rejected"

//   const purchase = await Purchase.findById(purchaseId);
//   if (!purchase) {
//     return next(new ErrorHandler("Purchase not found", 404));
//   }

//   if (!["Approved", "Rejected"].includes(action)) {
//     return next(new ErrorHandler("Invalid action", 400));
//   }

//   // ✅ Find the related request
//   const request = await Request.findOne({ purchase: purchaseId });
//   if (!request) {
//     return next(new ErrorHandler("Claim request not found", 404));
//   }

//   // ✅ Save to ClaimHistory before deleting
//   await ClaimHistory.create({
//     user: request.user,
//     policy: request.policy,
//     purchase: request.purchase,
//     note: request.note,
//     requestedAt: request.requestedAt,
//     status: action
//   });

//   // ✅ Update claim status
//   purchase.claimStatus = action;
//   await purchase.save();

//   // ✅ Delete original request
//   await request.deleteOne();

//   res.status(200).json({
//     success: true,
//     message: `Claim ${action.toLowerCase()} successfully`,
//     purchase
//   });
// });


export const deleteClaimRequest = catchAsyncErrors(async (req, res, next) => {
  const { requestId } = req.params;
  const request = await Request.findById(requestId);
  if (!request) return next(new ErrorHandler("Request not found", 404));
  await request.deleteOne();
  res.status(200).json({ success: true, message: "Request deleted" });
});







