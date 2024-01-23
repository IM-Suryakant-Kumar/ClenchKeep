import { INote } from "index";
import { Schema, model } from "mongoose";

const NoteSchema = new Schema<INote>(
	{
		title: { type: String, required: [true, "Please provide title"] },
		content: { type: String, required: [true, "Please provide content"] },
		backgound: { type: String, required: [true, "Please provide content"] },
		labels: [{ type: String, required: true }],
	},
	{ timestamps: true }
);

export default model<INote>("Note", NoteSchema);
