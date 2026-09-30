import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage(){
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            setError("invalid credentials");
        }
    }

    const navigateToHomePage = () => {
        navigate("/");
    }

    const navigateToLogin = () => {
        navigate("/login");
    }

    return(
        <div className="register-page">
            <h1>Register Page</h1>
            <form className="auth-info" onSubmit={handleSubmit}>
                <label>
                    First Name: <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>

                <label>
                    Last Name: <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>

                <label>
                    Email: <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                
                <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                    <button className="register-btn" type="submit">Create account</button>
            </form>
            {error && <p>{error}</p>}
            
            <button className="homeBtn" onClick={navigateToHomePage}>Home</button>
            <p>Already have an account?</p>
            <button onClick={navigateToLogin}>Go to login</button>
        </div>
    )

}

export default RegisterPage;