import { Router } from "express";
import { registerContact } from "../controllers/controller.contact.js";
import { upload } from "../middleware/middleware.multer.js";
import {uploadOnCloudinary}from "../utils/cloudinary.js"
import { updateContactByName } from "../controllers/controller.contact.js";
import {deleteContactByName} from "../controllers/controller.contact.js"
import{getContactByName} from "../controllers/controller.contact.js"
import {getContactsByLabel}from "../controllers/controller.contact.js"
import {toggleBookmark} from "../controllers/controller.contact.js"
const router = Router()

router.route("/register").post(
    upload.single('avatar'),
    registerContact);

router.route("/update/:name").put(updateContactByName);
router.route("/delete/:name").delete(deleteContactByName);
router.route("/get/:name").get(getContactByName);
router.route("/getlable/:label").get(getContactsByLabel);
router.route("/update/bookmark/:name").put(toggleBookmark);
export default router

