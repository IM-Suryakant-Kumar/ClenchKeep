import { toast } from "react-toastify";
import IApiRes from "../types/response";
import asyncWrapper from "../utils/asyncWrapper";
import { getTokenFromLocalStorage } from "../utils/handleToken";
import axios from "./axios";
import IArchive from "../types/archive";

export const getArchives = () =>
	asyncWrapper(async () => {
		const { data } = (await axios.get("/archive", {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

export const createArchive = (archive: IArchive) =>
	asyncWrapper(async () => {
		const { data } = (await axios.post("/archive", archive, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		toast.success(data.message);
		return data;
	});

export const getArchive = (noteId: string) =>
	asyncWrapper(async () => {
		const { data } = (await axios.get(`/archive/${noteId}`, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

export const updateArchive = (noteId: string, archive: IArchive) =>
	asyncWrapper(async () => {
		const { data } = (await axios.patch(`/archive/${noteId}`, archive, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		toast.success(data.message);
		return data;
	});

export const deleteArchive = (noteId: string) =>
	asyncWrapper(async () => {
		const { data } = (await axios.delete(`/archive/${noteId}`, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		toast.success(data.message);
		return data;
	});