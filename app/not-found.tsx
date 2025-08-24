// app/not-found.tsx
import css from "./not-found.module.css";
import type { Metadata } from "next";
import Image from "next/image";
import RedirectButton from "@/components/RedirectButton/RedirectButton.client";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NoteHub",
  description:
    "This page does not exist on NoteHub. Please return to the homepage.",
  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description:
      "This page does not exist on NoteHub. Please return to the homepage.",
    url: "https://08-zustand-omega-one.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 error",
      },
    ],
    type: "website",
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1>404 - Page Not Found</h1>
      <Image src="/img-404.png" alt="Not Found" width={400} height={300} />
      <p>Sorry, the page you are looking for does not exist.</p>
      <RedirectButton />
    </div>
  );
}
