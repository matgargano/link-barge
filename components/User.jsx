"use client";

import { getUserProfile } from "csc-start/utils/data";
import supabase from "csc-start/utils/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function getUserAndLinks() {
      const session = await supabase.auth.getSession();

      if (session?.data?.session?.user?.id) {
        const user = await getUserProfile(session.data.session.user.id);
        setUser(user);

        return;
      }
      router.push("/login");
    }
    getUserAndLinks();
  }, [router]);

  if (!user) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div>
      <p>Loaded</p>
    </div>
  );
};

export default User;
