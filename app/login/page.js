"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "csc-start/utils/data";
import Register from "csc-start/components/Register";
import Login from "csc-start/components/Login";

const Page = () => {
  return (
    <>
      <Login />
      <Register />
    </>
  );
};

export default Page;
