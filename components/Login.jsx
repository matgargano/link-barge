"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, loginUser } from "csc-start/utils/data";
import useMustBeLoggedOut from "csc-start/hooks/useMustBeLoggedOut";

const Login = () => {
  useMustBeLoggedOut("/profile");

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError(false);
    if (email && password) {
      const { error, success } = await loginUser(email, password);

      if (success) {
        router.push("/profile");
        return;
      }

      setError(error.message);
      setPassword("");
    }
  };

  return (
    <form onSubmit={submit} className="mt-5 w-[100%] flex justify-center">
      Login
      <div className="flex gap-3 flex-col">
        {error ? (
          <p className="bg-red-400 text-white font-bold p-2 rounded text-center">
            {error}
          </p>
        ) : null}

        <input
          required
          value={email}
          className="p-3 rounded"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          required
          value={password}
          className="p-3 rounded"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Login" />
      </div>
    </form>
  );
};

export default Login;
