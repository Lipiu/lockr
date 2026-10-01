import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../AuthPages.css";

function RegisterPage(){
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try{
            const res = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName, lastName, email, password}),
            credentials: "include",
            });
            if(res.ok){
                navigate("/login");
            }
            else{
                setError("Could not create account");
            }
        }
        catch {
            setError("Could not reach the server...");
        }
        
    }

    const navigateToHomePage = () => {
        navigate("/");
    }

    const navigateToLogin = () => {
        navigate("/login");
    }

   return (
  <div className="auth-page">
    <div className="auth-card">
      <h1>Create account</h1>
      <p className="auth-subtitle">Start storing your passwords safely</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-row">
          <label>
            First name
            <input required value={firstName}
                   onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            Last name
            <input required value={lastName}
                   onChange={(e) => setLastName(e.target.value)} />
          </label>
        </div>

        <label>
          Email
          <input type="email" required value={email}
                 onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password
          <input type="password" required value={password}
                 onChange={(e) => setPassword(e.target.value)} />
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button className="primary-btn" type="submit">Create account</button>
      </form>

      <div className="auth-footer">
        <p>Already have an account?</p>
        <button className="link-btn" type="button" onClick={navigateToLogin}>
          Go to login
        </button>
        <p></p>
        <button className="link-btn" type="button" onClick={navigateToHomePage}>
          ← Back to home
        </button>
      </div>
    </div>
  </div>
);

}

export default RegisterPage;