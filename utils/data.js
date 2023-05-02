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

const getLinks = (userId) => {
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

//registerUser('foo@bar.com', '1234', 'John Doe', 'john-doe')
const registerUser = async (email, password, name, slug) => {
  const {data, error} =  await supabase
    .from('profile')
    .select('*')
    .eq('slug', slug);
  if(error){
    return {
      success: false,
      message: error.message,
    }
  }
  if(data.length >0) {
    return {
      success: false,
      message: 'User slug already exists'
    }
  }

  const authResponse = await supabase.auth.signUp({
    email, password
  });

  if (authResponse.error) {
    return {
      success: false,
      message: authResponse.error.message
    }
  }

  if(authResponse.data.user) {
    const addMetaResponse = await supabase
      .from("profile")
      .insert([{user_id: authResponse.data.user.id, name, slug}])

    if(addMetaResponse.error) {
      return {
        success: false,
        message: addMetaResponse.error.message
      }
    }
    return {
      success:true,
      ...addMetaResponse.data
    }
  }

  return {
    success: false,
    message: 'An unknown error has occurred'
  }


}

export { registerUser, getLinksLinks, getSocialLinks, getCurrentUser };
