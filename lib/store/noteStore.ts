import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Tag } from "@/types/note";

export type DraftNote = {
  title: string;
  content: string;
  tag: Tag;
};

interface NoteStore {
  draft: DraftNote;
  setDraft: (note: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

export const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({ draft: { ...state.draft, ...note } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
