import supabase from "csc-start/utils/supabase";

export default async function Home() {
  const user = await supabase.auth.getUser();
  return (
    <main>
      <pre>{JSON.stringify(user, 0, 1)}</pre>
    </main>
  );
}
