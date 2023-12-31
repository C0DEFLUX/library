import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {

    //Get input values
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({
        userErr: '',
        passErr: '',
        status: ''
    })

    useEffect(() => {
    }, [error]);

    //Navigate
    const navigate = useNavigate()

    async function login() {

        let cleanData = {username, password}

        let response = await fetch('http://localhost/api/login', {

            method: 'POST',
            body: JSON.stringify(cleanData),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }

        })
        response = await response.json()

        if (response.status === 200) {
            localStorage.setItem('token', response.token)
            navigate('/');
        }

        if(response.status === 403) {
            setError(response)
        }
    }

    return (
        <div className="login-container min-h-screen flex justify-center items-center p-2 bg-background">
            <div className="login-box flex flex-col gap-3 bg-white shadow rounded-md p-2 py-8 w-full md:w-[30rem] md:p-20 md:min-h-[30rem] bg-secondary">
                <h1 className="text-2xl text-center mb-4 text-text">Login</h1>
                <input className="p-4 bg-tablehover text-text rounded-xl outline-none"
                       value={username}
                       type="text"
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Username"
                />
                {error.user_err && (
                    <span className="text-red">{error.user_err}</span>
                )}
                <input className="p-4 bg-tablehover rounded-xl text-text outline-none"
                       value={password}
                       type="password"
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"
                />
                {error.pass_err && (
                    <span className="text-red">{error.pass_err}</span>
                )}
                <button className="p-4 text-xl text-text rounded-xl bg-accent " onClick={login}>LOGIN</button>
                <a className="text-text" href="/register">Register</a>
            </div>
        </div>
    )
}

export default Login