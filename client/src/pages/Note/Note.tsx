import styles from "./note.module.css";
import { useGetNotesQuery } from "../../features/apis";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { toggleCreateModal } from "../../features/reducers";
import { CreateModal, NoteCard } from "../../components";
import { IoPencilOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const Note = () => {
	const showCreateModal = useAppSelector(state => state.modal.showCreateModal);
	const dispatch = useAppDispatch();
	const { data } = useGetNotesQuery();
	const [filterSearchParam, setFilterSearchParam] = useSearchParams();
	const filter = filterSearchParam.get("filter");

	let notes = data?.notes?.filter(note => !note.isArchived && !note.isTrashed);
	// filter note
	filter && (notes = notes?.filter(note => note.labels.includes(filter)));

	return (
		<div>
			{notes?.length === 0 && (
				<div className={styles.emptyCont}>
					<p className={styles.emptyDesc}>
						You don't have any note yet. Create one
					</p>
					<button
						className={styles.emptyBtn}
						onClick={() => dispatch(toggleCreateModal())}>
						CREATE NOTE
					</button>
				</div>
			)}
			{showCreateModal && <CreateModal />}
			<div className={styles.filterButtons}>
				<button
					className={styles.filterButton}
					style={{
						background: `${filterSearchParam.get("filter") ? "" : "#333"}`,
					}}
					onClick={() =>
						setFilterSearchParam((prevParams: URLSearchParams) => {
							prevParams.delete("filter");
							return prevParams;
						})
					}>
					All
				</button>
				<button
					className={styles.filterButton}
					style={{
						background: `${
							filterSearchParam.get("filter") === "study" ? "#333" : ""
						}`,
					}}
					onClick={() =>
						setFilterSearchParam((prevParams: URLSearchParams) => {
							prevParams.set("filter", "study");
							return prevParams;
						})
					}>
					Study
				</button>
				<button
					className={styles.filterButton}
					style={{
						background: `${
							filterSearchParam.get("filter") === "health" ? "#333" : ""
						}`,
					}}
					onClick={() =>
						setFilterSearchParam((prevParams: URLSearchParams) => {
							prevParams.set("filter", "health");
							return prevParams;
						})
					}>
					Health
				</button>
				<button
					className={styles.filterButton}
					style={{
						background: `${
							filterSearchParam.get("filter") === "office" ? "#333" : ""
						}`,
					}}
					onClick={() =>
						setFilterSearchParam((prevParams: URLSearchParams) => {
							prevParams.set("filter", "office");
							return prevParams;
						})
					}>
					Office
				</button>
			</div>
			<div className={styles.cards}>
				{notes?.reverse().map(note => (
					<NoteCard key={note._id} note={note} type="note" />
				))}
			</div>
			<button
				className={styles.modalBtn}
				onClick={() => dispatch(toggleCreateModal())}>
				<IoPencilOutline className={styles.btnIcon} />
			</button>
		</div>
	);
};

export default Note;
