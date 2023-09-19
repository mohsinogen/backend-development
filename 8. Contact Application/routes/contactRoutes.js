import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createContact, getContactList } from "../controllers/contactController.js";


const router = express.Router();

router.route("/").post(protect, createContact).get(getContactList)

export default router;