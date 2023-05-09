"use client";

import useUserMustBeLogged from "csc-start/hooks/useUserMustBeLogged";
import { useEffect } from "react";

const Profile = () => {
    useUserMustBeLogged("in", "/login");

    useEffect(()=> {
        
        
    }, [])


    return <div className="barge">Profile</div>
}

export default Profile;