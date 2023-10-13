import {userAuth} from "./userAuth";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Header() {

    const [isAuth, setIsAuth] = useState('')
    const token = localStorage.getItem('token')
    const [userName, setUserName] = useState('')
    const [uid, setUid] = useState('')
    const navigate = useNavigate()


    async function findByToken(token) {

        let cleanData = { token };

        let response = await fetch('http://localhost/api/find-by-token', {
            method: 'POST',
            body: JSON.stringify(cleanData),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });
        response = await response.json();

        setUid(response.uid)
        setUserName(response.username)

    }

    const checkUserAuthentication = async () => {
        try {
            // Replace with your token value
            const isAuthenticated = await userAuth(token);

            // Use the isAuthenticated value here
            if (isAuthenticated) {
                setIsAuth('true')
                findByToken(token)
            } else {
                setIsAuth('false')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    const handleMyBooks = (id) => {
        navigate(`/my-books/${id}`)
    }

    useEffect(()=> {
        checkUserAuthentication()
    }, [])


    return(
        <div className="container py-8">
            <div className="flex flex-col p-2 gap-2 lg:gap-0 lg:p-0 lg:flex-row justify-between">
                <a href="/" className="text-text">Library</a>
                <div>
                    {isAuth === 'true' ?
                        <div className="flex flex-wrap items-center gap-4">
                            <h1 className="text-text justify-center">Welcome, {userName}</h1>
                            <button className="py-4 px-8 text-text bg-accent cursor-pointer rounded-xl" onClick={()=>handleMyBooks(userName)}>My books</button>
                            <button className="py-4 px-8 text-text bg-secondary cursor-pointer rounded-xl" onClick={logout}>Logout</button>
                        </div>
                        :
                        <a className="p-4 bg-accent text-text px-10 rounded-xl" href="/login">LOGIN</a>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header