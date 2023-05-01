"use client";

import { getCurrentUser } from "csc-start/utils/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    getUser();
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
      <pre>{JSON.stringify(user, 0, 1)}</pre>
    </div>
  );
};

export default User;
