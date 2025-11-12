import { User } from "../models/userSchema.js";
import { Policy } from "../models/policySchema.js";
import { Purchase } from "../models/purchaseSchema.js";
import { Request } from "../models/requestSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { sendToken } from "../utils/sendToken.js";
import { claimHistory } from "../models/claimHistorySchema.js";

// REGISTER
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  
  if (!firstName || !lastName || !email || !password || !role) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler("User already exists", 409));
  }

  const user = await User.create({
  firstName,
  lastName,
  email,
  password,
  role
});

  sendToken(user, 201, res);
});

// LOGIN
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// LOGOUT
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now())
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
});


export const getPoliciesByCategory = catchAsyncErrors(async (req, res, next) => {
  const { category } = req.params;

  if (!category) {
    return next(new ErrorHandler("Category is required", 400));
  }

  const policies = await Policy.find({ category });

  res.status(200).json({
    success: true,
    count: policies.length,
    policies
  });
});

export const getPolicyById = catchAsyncErrors(async (req, res, next) => {
  const { policyId } = req.params;

  const policy = await Policy.findById(policyId);

  if (!policy) {
    return next(new ErrorHandler("Policy not found", 404));
  }

  res.status(200).json({
    success: true,
    policy
  });
});


export const getCurrentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user
  });
});


// PURCHASE POLICY
export const purchasePolicy = catchAsyncErrors(async (req, res, next) => {
  const { policyId } = req.params;

  const policy = await Policy.findById(policyId);
  
  if (!policy) {
    return next(new ErrorHandler("Policy not found", 404));
  }

  const purchase = await Purchase.create({
    policy: policy._id,
    user: req.user._id,
    claimStatus: "Not Initiated"
  });

  res.status(201).json({
    success: true,
    message: "Policy purchased successfully",
    purchase
  });
});


export const getMyPolicies = catchAsyncErrors(async (req, res, next) => {
  const purchases = await Purchase.find({ user: req.user._id }).populate("policy");

  res.status(200).json({
    success: true,
    count: purchases.length,
    purchases
  });
});


export const initiateClaimRequest = catchAsyncErrors(async (req, res, next) => {
  const { purchaseId } = req.params;
  const { note } = req.body;

  const purchase = await Purchase.findOne({
    _id: purchaseId,
    user: req.user._id
  });

  if (!purchase) {
    return next(new ErrorHandler("Purchase not found", 404));
  }

  if (purchase.claimStatus !== "Not Initiated") {
    return next(new ErrorHandler("Claim already initiated or processed", 400));
  }

  const request = await Request.create({
    policy: purchase.policy,
    user: req.user._id,
    purchase: purchase._id,
    note
  });

await claimHistory.create({
  policy: purchase.policy,
  user: req.user._id,
  purchase: purchase._id,
  note,
  requestedAt: new Date()
});



  purchase.claimStatus = "Under Process";
  purchase.claimRequestedAt = new Date();
  await purchase.save();

  res.status(201).json({
    success: true,
    message: "Claim request submitted successfully",
    request
  });
});


export const getClaimHistory = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const history = await claimHistory.find({ user: userId })
    .populate("policy")
    .populate("purchase");

  const formatted = history
    .filter(entry => entry.policy && entry.purchase)
    .map(entry => ({
      policy: {
        _id: entry.policy._id,
        title: entry.policy.title,
        description: entry.policy.description,
        category: entry.policy.category,
        claimAmount: entry.policy.claimAmount,
        monthlyPremium: entry.policy.monthlyPremium,
        image: entry.policy.image?.url || ''
      },
      claimStatus: entry.purchase.claimStatus,
      requestedAt: entry.requestedAt,
      purchasedAt: entry.purchase.purchasedAt,
      note: entry.note
    }));

  res.status(200).json({
    success: true,
    count: formatted.length,
    history: formatted
  });
});



