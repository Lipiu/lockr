import { useNavigate } from "react-router-dom";
import "./Home.css"

function Home(){
    const navigate = useNavigate();
    const navigateToLogIn = () => {
        navigate("/login")
    }
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={navigateToLogIn}>Go to sign in page</button>
        </div>
    );
}

export default Home;