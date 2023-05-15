import { getLinksLinks } from "csc-start/utils/data";

export const revalidate = 30;

const LinksLinks = async (user_id) => {
  const links = await getLinksLinks(user_id);

  return (
    <div className="barge flex flex-col gap-[24px] pb-[60px]">
      {!Array.isArray(links.data) ||
        (links.data.length === 0 && <p>No links found...</p>)}
      {Array.isArray(links.data) &&
        links.data.length === 0 &&
        links.data.map(({ id, title, url }) => {
          return (
            <a
              key={id}
              title={title}
              target="_blank"
              rel="noopener noreferrer"
              href={url}
              className="button"
            >
              {title}
            </a>
          );
        })}
    </div>
  );
};

export default LinksLinks;
