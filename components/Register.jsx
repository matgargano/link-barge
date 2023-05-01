"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "csc-start/utils/data";
import useMustBeLoggedOut from "csc-start/hooks/useMustBeLoggedOut";

const Register = () => {
  useMustBeLoggedOut("/profile");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError(false);
    if (email && password && name && slug) {
      const { error, success } = await registerUser(
        email,
        password,
        name,
        slug
      );

      if (success) {
        router.push("/login", { promptLogin: true });
        return;
      }

      setError(error.message);
      setPassword("");
    }
  };

  return (
    <form onSubmit={submit} className="mt-5 w-[100%] flex justify-center">
      Register
      <div className="flex gap-3 flex-col">
        {error ? (
          <p className="bg-red-400 text-white font-bold p-2 rounded text-center">
            {error}
          </p>
        ) : null}
        <input
          required
          value={name}
          className="p-3 rounded"
          type="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          required
          value={slug}
          className="p-3 rounded"
          type="slug"
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug"
        />
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
        <input type="submit" value="Register" />
      </div>
    </form>
  );
};

export default Register;
