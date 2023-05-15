// @todo ADD ERROR HANDLING THROUGHOUT APP

export const revalidate = 30;
import { getLatestSignups } from "csc-start/utils/data";
import Link from "next/link";

export default async function Home() {
  const { success, data, error } = await getLatestSignups();

  if (!!error) {
    return <p>{error.message}</p>;
  }

  return (
    <main className="barge">
      <p className="h1 my-5">Recent Users</p>
      {data.map(({ slug, name }) => (
        <Link
          className="block my-5 button small"
          key={slug}
          href={`/user/${slug}`}
        >
          {name}
        </Link>
      ))}
    </main>
  );
}
