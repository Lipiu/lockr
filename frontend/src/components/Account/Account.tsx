import { useEffect, useState } from "react";
import type { UserDto } from "../../types";
import { useNavigate } from "react-router-dom";

function Account(){
    const navigate = useNavigate();
    const [user, setUser] = useState<UserDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async() => {
            const res = await fetch("http://localhost:8080/api/auth/me", {
            credentials: "include",
            });
            if(res.ok){
                const data = await res.json();
                setUser(data);
            }
            else{
                setUser(null);
            }
            setLoading(false);    
        };
        checkAuth();
    }, []);

    if(loading){
        return <p>Loading...</p>
    }
    else if(!user){
        return (
        <div>
            <p>Not logged in</p>
            <button onClick={() => navigate("/login")}>Go to login</button>
        </div>
    )
    }
    return (
        <div>
            <p>Welcome, {user.email}</p>
            <button onClick={() => navigate("/")}>Home</button>
        </div>
    )
}

export default Account;