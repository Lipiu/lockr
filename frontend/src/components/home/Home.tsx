import { useNavigate } from "react-router-dom";
import "./Home.css"

function Home(){
    const navigate = useNavigate();
    const navigateToLogIn = () => {
        navigate("/login")
    }

    const navigateToRegister = () => {
        navigate("/register");
    }

    return (
        <div>
            <h1>Home Page</h1>
            <button className="login-btn" onClick={navigateToLogIn}>Go to login page</button>
            <button className="register-btn" onClick={navigateToRegister}>Go to register</button>
        </div>
    );
}

export default Home;