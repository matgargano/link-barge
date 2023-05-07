"use client";
import useUser from "csc-start/hooks/useUser";
import useUserMustBeLoggedOut from "csc-start/hooks/useUserMustBeLoggedOut";
import { loginUser } from "csc-start/utils/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const sendLoggedInUser = "/";

  useUserMustBeLoggedOut(sendLoggedInUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const { fullyLoaded, user } = useUser();

  const login = async (e) => {
    e.preventDefault();
    const authResponse = await loginUser(email, password);
    setResponse(authResponse);
    if (!!authResponse?.data?.user) {
      router.push(sendLoggedInUser);
    }

    setPassword("");
  };

  if (!fullyLoaded) {
    return <p>Loading...</p>;
  }

  if (!!user) {
    return <p>Redirecting</p>;
  }

  return (
    !!fullyLoaded &&
    !user && (
      <div className="barge">
        <h2 className="text-center h1 my-10">Login</h2>
        <form onSubmit={login}>
          <p className="mb-5">
            <label className="h3 w-[75px] inline-block" htmlFor="email">
              Email:{" "}
            </label>
            <input
              className="h3 border-2 border-black ml-5 inline-block w-[220px]"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
          <p className="mb-5">
            <label className="h3 w-[75px] inline-block" htmlFor="password">
              Password:{" "}
            </label>
            <input
              className="h3 border-2 border-black ml-5 inline-block w-[220px]"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <div className="flex justify-center my-10">
            <input className="button small" type="submit" value="Login" />
          </div>
        </form>
      </div>
    )
  );
};

export default Login;
