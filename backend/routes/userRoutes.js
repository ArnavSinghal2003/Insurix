import express from "express";
import { registerUser, loginUser, logoutUser, getPoliciesByCategory, getPolicyById, getCurrentUser, purchasePolicy, getMyPolicies, initiateClaimRequest, getClaimHistory} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/policies/:category", getPoliciesByCategory);
router.get("/policy/:policyId", getPolicyById);
router.get("/me", isAuthenticated, getCurrentUser);
router.post("/purchase/:policyId", isAuthenticated,purchasePolicy);
router.get("/mypolicies", isAuthenticated, getMyPolicies);
router.post("/claim/request/:purchaseId", isAuthenticated, initiateClaimRequest);
router.get("/myclaimhistory", isAuthenticated, getClaimHistory);


export default router;
