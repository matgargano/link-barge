"use client";

import { registerUser } from "csc-start/utils/data";
import { useState } from "react";

const Register = () => {

    const [response, setResponse] = useState(null);

    const testRegister = async () => {
        const register = await 
            registerUser('foo32@bar.com', '123456!', 'aaJohn Doe', 'fa-john-doe')

        setResponse(register);
    }
    return <div>
        {response && !response.success && <div className="bg-red-500">
            {response.message}
            </div>}
    <button onClick={testRegister}>
        Click me
    </button>
    <pre>{JSON.stringify(response,0,1)}</pre>
    </div>

}


export default Register;