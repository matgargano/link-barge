import TopContent from "../components/TopContent";
import SocialLinks from "../components/SocialLinks";
import LinksLinks from "../components/LinksLinks";
import Message from "csc-start/components/Message";

export default async function Home(props) {
  return (
    <main>
      <TopContent />
      <SocialLinks />
      <LinksLinks />
    </main>
  );
}
