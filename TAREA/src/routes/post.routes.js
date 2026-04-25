import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/new", postController.renderNewForm);
router.post("/new", postController.createFromWeb);
router.get("/edit/:id", postController.renderEditForm);
router.post("/update/:id", postController.updateFromWeb);
router.post("/delete/:id", postController.deleteFromWeb);

router.post("/:userId", postController.create);

export default router;
