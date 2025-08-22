"use client";

import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return <ErrorMessage message={error.message} />;
};

export default Error;
