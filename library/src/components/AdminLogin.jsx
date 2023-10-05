import {useState} from "react";
import {useNavigate} from "react-router-dom";

function AdminLogin() {

    //Get input values
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //Navigate
    const navigate = useNavigate()

    //Get input error spans
    const userErr = document.getElementById('user-err')
    let passErr = document.getElementById('pass-err')

    async function login() {


        let cleanData = {username, password}

        let response = await fetch('http://localhost/api/admin-login', {

            method: 'POST',
            body: JSON.stringify(cleanData),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }

        })
        response = await response.json()

        if (response.passErr !== '') {
            document.getElementById('pass-err').innerHTML = ''
            document.getElementById('pass-err').append(response.passErr)
        } else {
            document.getElementById('pass-err').innerHTML = ''
        }

        if (response.userErr !== '') {
            document.getElementById('user-err').innerHTML = ''
            document.getElementById('user-err').append(response.userErr)
        } else {
            document.getElementById('user-err').innerHTML = ''
        }

        if (response.status === 200) {
            localStorage.setItem('token', response.token)
            navigate('/dashboard');
        }
    }

    return (
        <div className="login-container min-h-screen flex justify-center items-center p-2 bg-background">
            <div className="login-box flex flex-col gap-3 bg-white shadow rounded-md p-2 py-8 w-full md:w-[30rem] md:p-20 md:min-h-[30rem] bg-secondary">
                <h1 className="text-2xl text-center mb-4 text-text">Admin Login</h1>
                <input className="p-4 bg-tablehover text-text rounded-xl outline-none"
                       value={username}
                       type="text"
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Username"
                />
                <span className="text-red" id="user-err" ></span>
                <input className="p-4 bg-tablehover rounded-xl text-text outline-none"
                       value={password}
                       type="password"
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"
                />
                <span className="text-red" id="pass-err" ></span>
                <button className="p-4 text-xl text-text rounded-xl bg-accent " onClick={login}>LOGIN</button>
            </div>
        </div>
    )
}


export default AdminLogin;