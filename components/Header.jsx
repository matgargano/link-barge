import Image from "next/image";
import cargoWhite from "../images/cargo-white.svg";
import Link from "next/link";

const Header = () => {
  return (
    <header className="barge bg-black flex justify-between items-center">
      <Link href="/">
        <Image src={cargoWhite} alt={"LinkBarge"} height="79" width="79" />
      </Link>
      <Link href="/">
        <p className="h1 text-white">BARGE</p>
      </Link>
    </header>
  );
};

export default Header;
