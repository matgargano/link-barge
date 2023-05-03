import { generateError, generateSuccess } from "csc-start/utils/data";
import supabase from "csc-start/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();

  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(authResponse);
  if (authResponse.data.user) {
    const name = await supabase
      .from("profile")
      .select("*")
      .eq("id", authResponse.data.user.id);
    return NextResponse.json(generateSuccess({ ...authResponse.data }));
  }

  if (authResponse.error) {
    return NextResponse.json(generateError(authResponse.error));
  }

  return NextResponse.json("Something went wrong");
}
