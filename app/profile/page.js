"use client";

import supabase from "csc-start/utils/supabase";
import { useRouter } from "next/navigation";
import { getUserProfile } from "../../utils/data";
import User from "csc-start/components/User";

const Page = () => {
  return <User />;
};

export default Page;
