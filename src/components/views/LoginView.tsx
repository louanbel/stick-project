import {useEffect, useState} from "react";
import '../../styles/LoginView.scss';
import BButton from "../BButton.tsx";
import {loginUser} from "../../helpers/loginHelper.ts";
import {useNavigate} from "react-router-dom";


export default function LoginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingError, setIsLoggingError] = useState(false);

    const abortController = new AbortController();
    const signal = abortController.signal;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log("Already logged in");
            navigate('/');
        }
        return () => {
            abortController.abort();
        };
    }, []);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        loginUser(signal, email, password).then((isLogged) => {
            if (isLogged) {
                setIsLoggingError(false);
                navigate('/');
            } else {
                setIsLoggingError(true);
            }
        });
    };

    return (
        <>
            <h1>Welcome to Stick !</h1>
            <div className="loginContent">
                <p className="loginLabel">Please fill in the fields below to log in.</p>
                <form onSubmit={handleSubmit} className="loginForm">
                    <div className="email">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setIsLoggingError(false)
                            }}
                        />
                    </div>

                    <div className="password">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setIsLoggingError(false)
                            }}
                        />
                    </div>
                    <div className="actions">
                        <BButton disabled={email.length <= 0 || password.length <= 0} first submit onClick={() => {
                        }}>Login</BButton>
                        <div className="loginAction">
                            <p>Don't have an account?</p>
                            <BButton second onClick={() => {
                                navigate('/register')
                            }}>Register</BButton>
                        </div>
                    </div>
                    {isLoggingError && <p className="error">Incorrect email or password</p>}
                </form>
            </div>

        </>
    )
}
