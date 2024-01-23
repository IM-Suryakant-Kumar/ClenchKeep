import { Response } from "express";
import { INoteReq } from "index";
import Note from "../modles/Note";

export const createNote = async (req: INoteReq, res: Response) => {
	const note = await Note.create(req.body);
	res
		.status(201)
		.json({ success: true, note, message: "Note created successfully" });
};

export const getNote = async (req: INoteReq, res: Response) => {
	const note = await Note.findById(req.params._id);
	res.status(200).json({ success: true, note });
};

export const getNotes = async (req: INoteReq, res: Response) => {
  const notes = await Note.find();
  res.status(200).json({ success: true, notes });
};

export const updateNote = async (req: INoteReq, res: Response) => {
	const note = await Note.findByIdAndUpdate(req.params._id, req.body, {
		new: true,
	});
	res
		.status(200)
		.json({ success: true, note, message: "Note updated successfully" });
};

export const deleteNote = async (req: INoteReq, res: Response) => {
	await Note.findByIdAndDelete(req.params._id);
	res.status(201).json({ success: true, message: "Note deleted successfully" });
};
