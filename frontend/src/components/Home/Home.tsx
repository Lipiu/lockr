import { useNavigate } from "react-router-dom";
import "./Home.css"
import { useEffect, useState } from "react";
import LiveTime from "../LiveTime/LiveTime";

function Home(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        async function loadUser(){
            const res = await fetch("http://localhost:8080/api/auth/me", {
                credentials: "include"
            });
            if(res.ok){
                const data = await res.json();
                setUsername(data.firstName);
            }
            else{
                setUsername("");
            }
        }
        loadUser();
    }, []);

    async function handleLogout(){
        await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        setUsername("");
    }

    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Welcome {username}</h1>
                <div className="auth">
                    {username === "" && (
                        <>
                            <button className="login-btn" onClick={() => navigate("/login")}>
                                Go to login page
                            </button>

                            <button className="register-btn" onClick={() => navigate("/register")}>
                                Go to register
                            </button>
                        </>
                    )}
                    {username !== "" && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Log out
                        </button>
                    )}
                </div>
            </header>
            <br/>
            <LiveTime></LiveTime>
            <p>Hello, {username}</p>
            <footer>
                <p>Lockr - password storage made easy</p>
            </footer>
        </div>
    );
}

export default Home;