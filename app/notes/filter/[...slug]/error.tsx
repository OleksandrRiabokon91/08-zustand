"use client";
import { useRouter } from "next/navigation";

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/notes/filter/all");
  };

  return (
    <div>
      <h2>Could not fetch the list of notes.</h2>
      <p>{error.message}</p>
      <button onClick={handleClick}>Try again</button>
    </div>
  );
};

export default Error;
