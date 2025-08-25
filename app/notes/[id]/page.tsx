// app/notes/[id]/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await getSingleNote(id);
    const title = note.title.slice(0, 9);
    const description =
      note.content?.slice(0, 14) || "NoteHub - detailed view of your note";
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://08-zustand-omega-one.vercel.app/notes/${note.id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: title || "NoteHub",
          },
        ],
        type: "website",
      },
    };
  } catch {
    return {
      title: "NoteHub - note",
      description: "View note details",
      openGraph: {
        title: "NoteHub - note",
        description: "View note details",
        url: "https://08-zustand-omega-one.vercel.app",
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub",
          },
        ],
        type: "website",
      },
    };
  }
}
