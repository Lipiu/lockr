import { useNavigate } from "react-router-dom";
import "./Home.css"

function Home(){
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Home Page</h1>

                <div className="auth-btn">
                    <button className="login-btn" onClick={() => navigate("/login")}>
                        Go to login page
                    </button>

                    <button className="register-btn" onClick={() => navigate("/register")}>
                        Go to register
                    </button>

                    <button className="account-btn" onClick={() => navigate("/account")}>
                        Go to account
                    </button>
                </div>
            </header>

            <footer>
                <p>Lockr - password storage made easy</p>
            </footer>
        </div>
    );
}

export default Home;