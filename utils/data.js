import supabase from "./supabase";

const getCurrentUser = async () => {
  const session = await supabase.auth.getSession();

  if (session?.data?.session?.user?.id) {
    const user = await supabase
      .from("profile")
      .select("*")
      .eq("id", session.data.session.user.id);
    return user.data[0];
  }
  return -1;
};

const loginUser = async (email, password) => {
  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authResponse.data.user) {
    const name = await supabase
      .from("profile")
      .select("name")
      .eq("id", authResponse.data.user.id);
    return { ...authResponse.data, success: true };
  }

  if (authResponse.error) {
    return { success: false, error: authResponse.error };
  }
};

const registerUser = async (email, password, name, slug) => {
  const { data } = await supabase.from("profile").select("*").eq("slug", slug);
  if (data.length > 0) {
    return generateError("Slug already exists...");
  }

  const authResponse = await supabase.auth.signUp({
    email,
    password,
  });

  if (authResponse.data.user) {
    const { data, error } = await supabase
      .from("profile")
      .insert([{ id: authResponse.data.user.id, name, slug }]);
    if (!!error) {
      return generateError(error.message);
    }
    return generateSuccess({ ...data, name });
  }

  if (authResponse.error) {
    return generateError(authResponse.error);
  }
};

const generateSuccess = (success) => {
  return { ...success, success: true };
};

const generateError = (error) => {
  return { success: false, error: { message: error } };
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
  let user = await supabase.from("profile").select("*").eq("id", user_id);

  return {};
};

const getSession = async () => await supabase.auth.getSession();

export {
  getSession,
  registerUser,
  getLinksLinks,
  getSocialLinks,
  getCurrentUser,
  getUserProfile,
  loginUser,
  generateError,
  generateSuccess,
};
