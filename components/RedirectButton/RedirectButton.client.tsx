"use client";
import { useRouter } from "next/navigation";
import css from "@/app/not-found.module.css";

export default function RedirectButton() {
  const router = useRouter();
  return (
    <button className={css.redirectButton} onClick={() => router.push("/")}>
      Go back home
    </button>
  );
}
