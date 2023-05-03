import { getSession } from "csc-start/utils/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useMustBeLoggedIn = (url) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getSessionWrapper = async () => {
      const session = await getSession();
      if (!session?.data?.session?.user?.id) {
        router.push(url);
      }
      setLoading(false);
    };
    getSessionWrapper();
  }, [router, url]);

  return {
    loading,
  };
};

export default useMustBeLoggedIn;
