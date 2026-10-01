import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";
import LiveTime from "../LiveTime/LiveTime";

function Home(){
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser(){
            try{
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
            catch{
                setUsername(null);
            }
            finally{
                setLoading(false);
            }
        }
        loadUser();
    }, []);

    async function handleLogout(){
        const res = await fetch("http://localhost:8080/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        if(res.ok){
            setUsername(null);
        }
    }

    function capitalizeFirstLetter(str: string | null){
        if(!str){
            return "";
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const isLoggedIn = username !== null;

    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Lockr Home Page</h1>
                <div className="auth">
                    {!loading && !isLoggedIn && (
                        <>
                            <button onClick={() => navigate("/login")}>Log in</button>
                            <button className="filled" onClick={() => navigate("/register")}>Register</button>
                        </>
                    )}
                    {!loading && isLoggedIn && (
                        <button onClick={handleLogout}>Log out</button>
                    )}
                </div>
            </header>

            <main className="home-greeting">
                <LiveTime />
                {!loading && isLoggedIn && <p>// Hello, {capitalizeFirstLetter(username)}!</p>}
                {!loading && !isLoggedIn && <p>You are logged out.</p>}
            </main>

            <footer>
                <p>Lockr - password storage made easy</p>
            </footer>
        </div>
    );
}

export default Home;