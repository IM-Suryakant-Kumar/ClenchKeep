import { MdClose } from "react-icons/md";
import { useAppDispatch } from "../../features/hook";
import styles from "./modal.module.css";
import { toggleCreateModal } from "../../features/reducers";
import { Editor } from "..";
import { useState } from "react";
import { useCreateNoteMutation } from "../../features/apis";
import { INote } from "../../types";

const CreateModal = () => {
	const dispatch = useAppDispatch();
	const [createNote, { isLoading }] = useCreateNoteMutation();
	const [content, setContent] = useState<string>("");
	const [background, setBackground] = useState<string>("#ebf2fa");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const title = formData.get("title") as string;
		const labels = [] as string[];
		if (formData.get("study")) labels.push("study");
		if (formData.get("health")) labels.push("health");
		if (formData.get("office")) labels.push("office");
    
		createNote({ title, content, background, labels } as INote);
		dispatch(toggleCreateModal());
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper} style={{ background: `${background}` }}>
				<MdClose
					className={styles.closeBtn}
					onClick={() => dispatch(toggleCreateModal())}
				/>
				<form onSubmit={handleSubmit}>
					<input
						name="title"
						className={styles.title}
						placeholder="Add title"
						required
					/>
					<Editor content={content} setContent={setContent} />
					<div className={styles.colors}>
						<div
							className={styles.color}
							onClick={() => setBackground("#f7622b")}></div>
						<div
							className={styles.color}
							onClick={() => setBackground("#d8bd42")}></div>
						<div
							className={styles.color}
							onClick={() => setBackground("#5bd842")}></div>
						<div
							className={styles.color}
							onClick={() => setBackground("#42d5d8")}></div>
						<div
							className={styles.color}
							onClick={() => setBackground("#ebf2fa")}></div>
					</div>
					<div className={styles.labels}>
						<label>
							<input type="checkbox" name="study" value="study" /> Study
						</label>
						<label>
							<input type="checkbox" name="health" value="health" /> Health
						</label>
						<label>
							<input type="checkbox" name="office" value="office" /> Office
						</label>
					</div>
					<button className={styles.button} disabled={isLoading}>{isLoading ? "Creating..." : "Create"}</button>
				</form>
			</div>
		</div>
	);
};

export default CreateModal;
