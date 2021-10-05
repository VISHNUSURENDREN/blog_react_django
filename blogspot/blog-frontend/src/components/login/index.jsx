import style from "./index.module.css";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

const LoginForm = (props) =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = e =>{
        e.preventDefault();
        props.onLogin(email, password);
    }

    return (
        <section id="login">
            <Container className={style.logindiv}>
                <div className={style.logincard}>
                    <h1>LOGIN</h1>
                    <form onSubmit={submitHandler}>
                        
                            <div className={style.inputdiv}>
                                <input type="text" placeholder="Username" name="username" id="username" 
                                value={email}
                                onChange={emailChangeHandler}
                                required
                                />
                            </div>
                            <div className={style.inputdiv}>
                                <input type="password" placeholder="Password" name="password" id="password"
                                value={password}
                                onChange={passwordChangeHandler}
                                required
                                />
                            </div>
                            <div className={style.buttondiv}>
                                <Button  type="submit">
                                    SUBMIT
                                </Button>
                            </div>
                            <p><Link to="/signup">Want to create an account? Signup Now!</Link></p>
                        
                    </form>
                </div>
                
            </Container>
        </section>
    )
}
export default LoginForm;