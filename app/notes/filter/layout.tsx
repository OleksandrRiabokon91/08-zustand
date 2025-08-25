import React from "react";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesLayout({ children, sidebar }: Props) {
  return (
    <div>
      {sidebar}
      {children}
    </div>
  );
}
