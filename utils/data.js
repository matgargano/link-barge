import supabase from "./supabase";

const getCurrentUser = () => {
  return {
    id: 1,
    email: "mgargano@gmail.com",
    name: "Mat Gargano",
    bio: "The quick brown fox.....",
    avatar: "https://placebear.com/200/200",
  };
};

const loginUser = async (email, password) => {
  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  debugger;
  if (authResponse.data.user) {
    const name = await supabase
      .from("profile")
      .select("name")
      .eq("id", authResponse.data.user.id);
    return { ...authResponse.data, name: name.data[0].name, success: true };
  }

  if (authResponse.error) {
    return { success: false, error: authResponse.error };
  }
};

const registerUser = async (email, password, name) => {
  const authResponse = await supabase.auth.signUp({ email, password });
  if (authResponse.data.user) {
    await supabase
      .from("profile")
      .insert([{ id: authResponse.data.user.id, name }]);

    return { ...authResponse.data, name, success: true };
  }

  if (authResponse.error) {
    return { success: false, error: authResponse.error };
  }
};

const getLinks = async (userId) => {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    return [];
  }
  return data;
};

const getLinksFiltered = (userId, by) => {
  if (!["social", "link"].includes(by)) {
    return false;
  }

  return getLinks()
    .filter(({ linkType }) => linkType === by)
    .sort((a, b) => a.order - b.order);
};

const getSocialLinks = (userId) => {
  return getLinksFiltered(userId, "social");
};

const getLinksLinks = (userId) => {
  return getLinksFiltered(userId, "link");
};

const getUserProfile = async (user_id) => {
  let { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user_id);

  return {
    name: profile[0].name,
    picture: profile[0].picture,
    bio: profile[0].bio,
  };
};

export {
  registerUser,
  getLinksLinks,
  getSocialLinks,
  getCurrentUser,
  getUserProfile,
  loginUser,
};
