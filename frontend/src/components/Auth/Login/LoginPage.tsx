import { useNavigate } from "react-router-dom";
import "./LoginPage.css"
import { useState } from "react";
import type { SyntheticEvent } from "react";

function LoginPage(){
        const navigate = useNavigate();
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [error, setError] = useState("");
        
        const handleSubmit = async(e: SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            if(res.ok){
                navigate("/");
            }
            else
                setError("Wrong email or password");
        }

    return (
        <div className="login-page">
            <form className="auth-info" onSubmit={handleSubmit}>
                <label>
                    Email: <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                    <button className="login-btn" type="submit">Log in</button>
            </form>
            {error && <p>{error}</p>}
            <button className="homeBtn" onClick={() => navigate("/")}>Home</button>
            <p>Don't have an account?</p>
            <button onClick={() => navigate("/register")}>Register here!</button>
        </div>
    );
}

export default LoginPage;