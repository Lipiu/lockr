import { useNavigate } from "react-router-dom";
import "../AuthPages.css";
import { useState } from "react";
import type { SyntheticEvent } from "react";

function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email }),
                credentials: "include",
            });
            if(res.ok){
                navigate("/login");
            }
            else{
                setError("Could not send password reset request");
            }
        }
        catch {
            setError("Could not reach the server");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <h1>Forgot password?</h1>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <label>
                        Email
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    {error && <p className="auth-error">{error}</p>}

                    <button className="primary-btn" type="submit">
                        Reset password
                    </button>

                </form>

                <div className="auth-footer">

                    <button
                        className="link-btn"
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        ← Back to login
                    </button>

                    <button
                        className="link-btn"
                        type="button"
                        onClick={() => navigate("/")}
                    >
                        ← Back to home
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ForgotPasswordPage;
