import express from "express";
import { createPolicy, deletePolicy, getAllClaimRequests, processClaimRequest, deleteClaimRequest  } from "../controllers/adminController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/policy/create", isAuthenticated, authorizeRoles("admin"), upload.single("image"), createPolicy);
router.delete("/policy/:policyId", isAuthenticated, authorizeRoles("admin"), deletePolicy);
router.get("/claims", isAuthenticated, authorizeRoles("admin"), getAllClaimRequests);
router.put("/claims/:purchaseId", isAuthenticated, authorizeRoles("admin"), processClaimRequest);
router.delete("/request/:requestId", isAuthenticated, authorizeRoles("admin"), deleteClaimRequest);

export default router;



