"use client";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { NewNote, Tag, tagOptions } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ [event.target.name]: event.target.value });
  };
  const handleSubmit = (formData: FormData) => {
    const data: NewNote = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as Tag,
    };
    mutate(data);
  };
  const handleClose = () => router.back();

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          className={css.input}
          required
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          name="content"
          defaultValue={draft?.content}
          onChange={handleChange}
          className={css.textarea}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          defaultValue={draft?.tag || "Todo"}
          onChange={handleChange}
          className={css.select}
        >
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
