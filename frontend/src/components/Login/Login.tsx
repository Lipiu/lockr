import { useNavigate } from "react-router-dom";
import "./Login.css"
import { useState } from "react";
import type { SyntheticEvent } from "react";

function Login(){
        const navigate = useNavigate();
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [error, setError] = useState("");
        
        const handleSubmit = async(e: SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                body: new URLSearchParams({
                    username: email, password
                }),
                credentials: "include",
            });
            if(res.ok)
                navigate("/account")
            else
                setError("Wrong email or password");
        }

    const navigateHome = () => {
        navigate('/');
    };

    return (
        <div className="login-page">
            <form className="auth-info" onSubmit={handleSubmit}>
                <label>
                    Email: <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                    <button className="secretBtn" type="submit">Sign in</button>
            </form>
            {error && <p>{error}</p>}
            <button className="homeBtn" onClick={navigateHome}>Home</button>
        </div>
    );
}

export default Login;