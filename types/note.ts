export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}

export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export type NoteTag = Note["tag"];

export interface NewNote {
  title: string;
  content: string;
  tag: Tag;
}

export const tagOptions: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];
