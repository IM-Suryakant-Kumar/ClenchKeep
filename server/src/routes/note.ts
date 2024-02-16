import { Router } from "express";
import {
	createNote,
	deleteNote,
	getNote,
	getNotes,
	updateNote,
} from "../controllers";

const router = Router();

router.route("/").get(getNotes).post(createNote);
router.route("/:_id").get(getNote).patch(updateNote).delete(deleteNote);

export default router;
