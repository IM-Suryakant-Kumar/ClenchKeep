import { Request } from "express";
import { Document } from "mongoose";

// User
export interface IUser extends Document {
	name: string;
	email: string;
	password: string;

	comparePassword: (candidatePassword: string) => Promise<boolean>;
	createJWTToken: () => string;
}
export interface IReq extends Request {
	body: { name?: string; email?: string; password?: string };
	user?: IUser & { role?: string };
}

// Note
export interface INote extends Document {
  userId: string;
	title: string;
	content: string;
	background: string;
	labels: string[];
}

export interface INoteReq extends Request {
	body: {
		title: string;
		content: string;
		background?: string;
		labels?: string[];
	};
  user: IUser;
	params: { noteId?: string };
}

// Archive
export interface IArchive extends Document {
	userId: string;
	noteId: string;
}

export interface IArchiveReq extends Request {
	body: { noteId?: string };
  params: { noteId?: string };
  user: IUser;
}

// Trash
export interface ITrash extends Document {
	userId: string;
	noteId: string;
}

export interface ITrashReq extends Request {
	body: { noteId?: string };
  params: { noteId?: string };
  user: IUser;
}