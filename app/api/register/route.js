import { generateError, generateSuccess } from "csc-start/utils/data";
import supabase from "csc-start/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password, name, slug } = await request.json();

  const { data } = await supabase.from("profile").select("*").eq("slug", slug);
  if (data.length > 0) {
    return NextResponse.json(generateError("Slug already exists..."));
  }
  const authResponse = await supabase.auth.signUp({
    email,
    password,
  });
  if (authResponse.data.user) {
    const r = await supabase
      .from("profile")
      .insert([{ id: authResponse.data.user.id, name, slug }]);
    return NextResponse.json(generateSuccess({ ...authResponse.data, name }));
  }

  if (authResponse.error) {
    return NextResponse.json(generateError(authResponse.error));
  }

  return NextResponse.json(generateError("Something went wrong..."));
}
