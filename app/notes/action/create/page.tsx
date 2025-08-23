import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { NewNote, Tag } from "@/types/note";
import { createNote } from "@/lib/api";

export const metadata = {
  title: "Create a new note",
  description: "Page for creating a new note with title, content, and tag.",
  alternates: { canonical: "/notes/create" },
  openGraph: {
    title: "Create a new note",
    description: "Fill out the form to create and save a new note.",
    url: "https://your-domain.com/notes/create",
    images: [
      {
        url: "https://your-domain.com/og-images/create-note.png",
        width: 1200,
        height: 630,
        alt: "Create Note Page",
      },
    ],
  },
};

export default function CreateNote() {
  async function createNoteAction(formData: FormData) {
    "use server";

    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const tag = String(formData.get("tag") || "Todo") as Tag;

    const payload: NewNote = { title, content, tag };
    await createNote(payload);
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm action={createNoteAction} />
      </div>
    </main>
  );
}
