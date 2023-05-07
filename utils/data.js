import supabase from "./supabase";

const getCurrentUser = async () => {
  const session = await supabase.auth.getSession();
  if (session?.data?.session?.user) {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", session.data.session.user.id);

    const user = { ...session.data.session.user };
    user.bargeMeta = data;
    return { data: user, error };
  }

  return null;
};

const getLinks = async (userId) => {
  let actualUserId = userId;
  if (!actualUserId) {
    const {
      data: { id },
    } = await getCurrentUser();
    actualUserId = id;
  }
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", actualUserId);

  return data;

  return [
    {
      id: 1,
      userId: 1,
      url: "https://twitter.com/foobar",
      order: 1,
      linkType: "social",
      title: "Twitter",
    },
    {
      id: 2,
      userId: 1,
      url: "https://facebook.com/foobar",
      order: 2,
      linkType: "social",
      title: "Facebook",
    },
    {
      id: 3,
      userId: 1,
      url: "https://mycompany.com",
      order: 1,
      linkType: "link",
      title: "My Company!",
    },
    {
      id: 4,
      userId: 1,
      url: "https://myteam.com",
      order: 2,
      linkType: "link",
      title: "Go sportsball Go",
    },
  ];
};

const getLinksFiltered = async (userId, by) => {
  if (!["social", "link"].includes(by)) {
    return false;
  }
  const links = await getLinks();

  return links
    .filter(({ linkType }) => linkType === by)
    .sort((a, b) => a.order - b.order);
};

const getSocialLinks = (userId) => {
  return getLinksFiltered(userId, "social");
};

const getLinksLinks = (userId) => {
  return getLinksFiltered(userId, "link");
};

//registerUser('foo@bar.com', '1234', 'John Doe', 'john-doe')
const registerUser = async (email, password, name, slug) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("slug", slug);
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  if (data.length > 0) {
    return {
      success: false,
      message: "User slug already exists",
    };
  }

  const authResponse = await supabase.auth.signUp({
    email,
    password,
  });

  if (authResponse.error) {
    return {
      success: false,
      message: authResponse.error.message,
    };
  }

  if (authResponse.data.user) {
    const addMetaResponse = await supabase
      .from("profile")
      .insert([{ user_id: authResponse.data.user.id, name, slug }]);

    if (addMetaResponse.error) {
      return {
        success: false,
        message: addMetaResponse.error.message,
      };
    }
    return {
      success: true,
      message:
        "Registration successful, please wait a few moments to be taken to the login page",
      ...addMetaResponse.data,
    };
  }

  return {
    success: false,
    message: "An unknown error has occurred",
  };
};

const loginUser = async (email, password) => {
  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authResponse.error) {
    return {
      success: false,
      error: authResponse.error,
    };
  }

  if (authResponse.data.user) {
    const meta = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", authResponse.data.user.id);

    if (meta.error) {
      return {
        success: false,
        error: meta.error,
      };
    }
    return {
      ...authResponse,
      meta,
      success: true,
    };
  }

  return {
    success: false,
    message: "An unknown error has occurred",
  };
};

const saveLinks = async (links) => {
  const {
    data: { id },
  } = await getCurrentUser();

  links.forEach(async (link) => {
    link.user_id = id;
    const addMetaResponse = await supabase.from("links").insert(link);
    debugger;
  });
};

export {
  saveLinks,
  loginUser,
  registerUser,
  getLinksLinks,
  getSocialLinks,
  getCurrentUser,
};
