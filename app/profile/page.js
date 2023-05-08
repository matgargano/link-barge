"use client";

import Profile from "csc-start/components/Profile";
import { useState } from "react";
import useUser from "../hooks/useUser";

const Page = () => {
  const [tab, setTab] = useState("social");
  const user = useUser();
  console.log(user);
  return (
    <div className="barge">
      <div className="flex justify-around my-5 w-full items-center">
        <p>Choose Links to Edit</p>
        <button
          disabled={tab === "social"}
          className={`button small `}
          onClick={() => setTab("social")}
        >
          Social
        </button>
        <button
          disabled={tab === "links"}
          className={`button small`}
          onClick={() => setTab("links")}
        >
          Links
        </button>
      </div>
      {user?.user?.bargeMeta?.slug && (
        <div className="flex items-center w-full my-10">
          <label htmlFor="slug" className="mr-4 grow-0">
            Your URL:{" "}
          </label>
          <input
            id="slug"
            className="border-[3px] border-block px-2 grow"
            disabled="disabled"
            value={`${window.location.origin}/user/${user?.user?.bargeMeta?.slug}`}
          />
        </div>
      )}
      {tab === "social" && <Profile type="social" />}
      {tab === "links" && <Profile type="link" />}
    </div>
  );
};

export default Page;
