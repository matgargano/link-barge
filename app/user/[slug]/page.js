import LinksLinks from "csc-start/components/LinksLinks";
import SocialLinks from "csc-start/components/SocialLinks";
import {
  getLinksLinks,
  getSocialLinks,
  getUserIdBySlug,
} from "csc-start/utils/data";
import { notFound } from "next/navigation";
export const revalidate = 1;
const Page = async ({ params: { slug } }) => {
  const { data, error } = await getUserIdBySlug(slug);

  if (!data) {
    notFound();
  }
  if (!!error) {
    return <p>{error.message}</p>;
  }

  const { user_id } = data;

  const socialLinks = await getSocialLinks(data.user_id);
  const linksLinks = await getLinksLinks(data.user_id);

  return (
    <>
      <SocialLinks links={socialLinks} />
      <LinksLinks links={linksLinks} />
    </>
  );
};

export default Page;
