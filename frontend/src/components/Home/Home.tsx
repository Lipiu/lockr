import { useNavigate } from "react-router-dom";
import "./Home.css"
import { useEffect, useState } from "react";
import LiveTime from "../LiveTime/LiveTime";

function Home(){
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

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
                setUsername(null);
            }
        }
        loadUser();
    }, []);

    async function handleLogout(){
        await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        setUsername(null);
    }

    function capitalizeFirstLetter(str: string | null) {
        if(!str){
            return "";
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const capitalizedUsername = capitalizeFirstLetter(username);

    const isLoggedIn = username !== null;

    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Home Page</h1>
                <div className="auth">
                    {!isLoggedIn && (
                        <>
                            <button className="login-btn" onClick={() => navigate("/login")}>
                                Go to login page
                            </button>

                            <button className="register-btn" onClick={() => navigate("/register")}>
                                Go to register
                            </button>
                        </>
                    )}
                    {isLoggedIn && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Log out
                        </button>
                    )}
                </div>
            </header>
            <br/>
            <LiveTime></LiveTime>
            <p>
                {isLoggedIn ? `Hello, ${capitalizedUsername}!` : "You are logged out..."}
            </p>
            <footer>
                <p>Lockr - password storage made easy</p>
            </footer>
        </div>
    );
}

export default Home;