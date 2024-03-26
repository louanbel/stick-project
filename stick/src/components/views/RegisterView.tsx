import {useEffect, useState} from "react";
import '../../styles/views/RegisterView.scss';
import BButton from "../BButton.tsx";
import {registerUser} from "../../helpers/loginHelper.ts";
import {useNavigate} from "react-router-dom";
import {LoginResponse, LoginStatus} from "../../types/LoginResponse.ts";


export default function RegisterView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [isLoggingSameError, setIsLoggingSameError] = useState(false);
    const [registerReponse, setRegisterResponse] = useState<LoginResponse | null>(null);
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
        registerUser(signal, email, password).then((registerResponse) => {
            if (registerResponse.loginStatus == LoginStatus.SUCCESS) {
                navigate('/');
            }
            setRegisterResponse(registerResponse);
        });
    };

    return (
        <>
            <h1>Welcome to Stick !</h1>
            <div className="loginContent">
                <p className="loginLabel">Please fill in the fields below to register.</p>
                <form onSubmit={handleSubmit} className="loginForm">
                    <div className="email">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
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
                                if (repeatedPassword != '') {
                                    setIsLoggingSameError(e.target.value !== repeatedPassword);
                                }
                            }}
                        />
                    </div>
                    <div className="password">
                        <label>Repeat password</label>
                        <input
                            type="password"
                            value={repeatedPassword}
                            onChange={(e) => {
                                setRepeatedPassword(e.target.value);
                                if (password != '') {
                                    setIsLoggingSameError(e.target.value !== password);
                                }
                            }}
                        />
                    </div>
                    {isLoggingSameError && password != '' && <p className="error">The passwords doesn't match</p>}
                    <div className="actions">
                        <BButton disabled={email.length <= 0 || password.length <= 0 || isLoggingSameError} first submit
                                 onClick={() => {
                                 }}>Register</BButton>
                        <div className="loginAction">
                            <p>Already have an account?</p>
                            <BButton second onClick={() => {
                                navigate('/login')
                            }}>Login</BButton>
                        </div>
                    </div>
                    {registerReponse != null &&
                        <p className={registerReponse.loginStatus == LoginStatus.SUCCESS ? 'success' : 'error'}>{registerReponse.loginMessage}</p>}
                </form>
            </div>

        </>
    )
}
