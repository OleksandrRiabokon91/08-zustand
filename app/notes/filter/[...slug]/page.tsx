// app/notes/filter/[...slug]/page.tsx
import fetchNotes from "@/lib/api";
import { tagOptions, Tag } from "@/types/note";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const maybeTag = slug?.[0];
  const tag: Tag | "All" = tagOptions.includes(maybeTag as Tag)
    ? (maybeTag as Tag)
    : "All";

  const title =
    tag === "All"
      ? "All Notes - NoteHub"
      : `Notes filtered by ${tag} - NoteHub`;

  const description =
    tag === "All"
      ? "Browse all notes in NoteHub. Organize, search, and manage your thoughts easily."
      : `Browse notes filtered by ${tag} in NoteHub. Organize, search, and manage your thoughts easily.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url:
        tag === "All"
          ? "https://notehub.com/notes/filter/all"
          : `https://notehub.com/notes/filter/${tag}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const maybeTag = slug?.[0];
  const tag: Tag | undefined = tagOptions.includes(maybeTag as Tag)
    ? (maybeTag as Tag)
    : undefined;

  const data = await fetchNotes({
    page: 1,
    search: "",
    tag,
  });

  return <NotesClient initialData={data} selectedTag={tag} />;
}
