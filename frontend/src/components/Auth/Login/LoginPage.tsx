import { useNavigate } from "react-router-dom";
import "../AuthPages.css";
import { useState } from "react";
import type { SyntheticEvent } from "react";

function LoginPage(){
        const navigate = useNavigate();
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [error, setError] = useState("");
        
        const handleSubmit = async(e: SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            setError("");
            try{
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
            catch {
                setError("Could not reach the server...");
            }
        }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Welcome back</h1>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input type="email" autoComplete="email" required value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                    </label>

                    <label>
                        Password
                        <input type="password" autoComplete="current-password" required value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    {error && <p className="auth-error">{error}</p>}
                    <button className="forgot-password-btn" onClick={() => navigate("/forgot-password")}>Forgot password?</button>
                    <button className="primary-btn" type="submit">Log in</button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account?</p>
                    <button className="link-btn" type="button" onClick={() => navigate("/register")}>
                        Register here
                    </button>
                    <button className="link-btn" type="button" onClick={() => navigate("/")}>
                        ← Back to home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;