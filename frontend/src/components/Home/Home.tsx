import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";
import LiveTime from "../LiveTime/LiveTime";
import lockrLogo from '../../assets/lockrLogo.png';
import PasswordGroup from "../PasswordGroup/PasswordGroup";

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
                    setUsername(data.firstName + " " + data.lastName);
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
        try{
            const res = await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });
            if(res.ok){
                setUsername(null);
            }
        }
        catch(error){
            console.error("Logout failed: ", error);
        }
    }

    const isLoggedIn = username !== null && !loading;

    return (
        <div className="home-page">
            <header className="home-header">
                <img src={lockrLogo}/>
                <div className="auth">
                    {!loading && !isLoggedIn && (
                        <>
                            <button className="btn" onClick={() => navigate("/login")}>Log in</button>
                            <button className="btn" onClick={() => navigate("/register")}>Register</button>
                        </>
                    )}
                    {isLoggedIn && (
                        <button className="btn" onClick={handleLogout}>Log out</button>
                    )}
                </div>
            </header>

            <main className="home-greeting">
                <LiveTime />
                {
                    isLoggedIn ? (
                        <p>// Hello, {username}!</p>
                    ) : (
                        <p>You are logged out.</p>
                    )
                }
            </main>
            <>
            {
                isLoggedIn ? (
                    <PasswordGroup/>
                ) : (
                    null
                )
            }
            </>

            <footer>
                <p>Lockr - password storage made easy</p>
            </footer>
        </div>
    );
}

export default Home;