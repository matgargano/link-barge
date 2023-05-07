"use client";
import { useRouter } from "next/navigation";

const Message = (props) => {
  const router = useRouter();
  return <pre>{JSON.stringify(props)}</pre>;
};

export default Message;
