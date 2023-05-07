"use client";
const { default: useUser } = require("csc-start/hooks/useUser");
const { default: Link } = require("next/link");

const ExtraMenu = () => {
  const { user, fullyLoaded } = useUser();

  return (
    <div className="flex barge gap-10 h3 mt-10">
      {!fullyLoaded && <p>Loading</p>}
      {!!fullyLoaded && !!user && <Link href="/profile">Profile</Link>}
      {!!fullyLoaded && !user && (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default ExtraMenu;
