import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ITrash from "../../types/trash";
import {
	getTrashes as getTrashesApi,
	createTrash as createTrashApi,
	deleteTrash as deleteTrashApi,
} from "../../apis/trash";

interface TrashState {
	trashes: ITrash[] | null;
	errorMessage: string | null;
	isLoading: boolean;
}

const initialState: TrashState = {
	trashes: null,
	errorMessage: null,
	isLoading: false,
};

export const getTrashes = createAsyncThunk(
	"trash/trashes",
	async (_, { rejectWithValue }) => {
		const data = await getTrashesApi();
		return data.success ? data.trashes : rejectWithValue(data.message);
	}
);

export const createTrash = createAsyncThunk(
	"trash/create",
	async (trash: ITrash, { rejectWithValue }) => {
		const data = await createTrashApi(trash);
		return !data.success && rejectWithValue(data.message);
	}
);

export const deleteTrash = createAsyncThunk(
	"trash/delete",
	async (noteId: string, { rejectWithValue }) => {
		const data = await deleteTrashApi(noteId);
		return !data.success && rejectWithValue(data.message);
	}
);

const trashSlice = createSlice({
	name: "trash",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getTrashes.pending, state => {
				state.isLoading = true;
			})
			.addCase(getTrashes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.trashes = action.payload;
			})
			.addCase(getTrashes.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(createTrash.pending, state => {
				state.isLoading = true;
			})
			.addCase(createTrash.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(createTrash.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(deleteTrash.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteTrash.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(deleteTrash.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			});
	},
});

export default trashSlice.reducer
