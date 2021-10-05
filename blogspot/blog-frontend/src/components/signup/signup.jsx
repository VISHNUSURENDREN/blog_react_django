import React from 'react';
import style from "./index.module.css";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';


const Signup = (props) => {
    const [user, setUser] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userChangeHandler = (event) => {
        setUser(event.target.value);
    }

    const fnameChangeHandler = (event) => {
        setFname(event.target.value);
    }

    const lnameChangeHandler = (event) => {
        setLname(event.target.value);
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = e =>{
        e.preventDefault();
        props.onSignup(user, fname, lname, email, password);
    }
    return (

        <section id="login">
            <Container className={style.logindiv}>
                <div className={style.logincard}>
                    <h1>
                        SIGN UP!
                    </h1>
                    <form onSubmit={submitHandler}>
                        <div className={style.inputdiv}>
                            <input type="text" name="username" placeholder="Username" id="username" 
                            value={user}
                            onChange={userChangeHandler}
                            required
                            />
                        </div>
                        <div className={style.inputdiv}>
                            <input type="text" name="fname" placeholder="First Name" id="fname" 
                            value={fname}
                            onChange={fnameChangeHandler}
                            required
                            />
                        </div>
                        <div className={style.inputdiv}>
                            <input type="text" name="lname" placeholder="Last Name" id="lname" 
                            value={lname}
                            onChange={lnameChangeHandler}
                            required
                            />
                        </div>
                        <div className={style.inputdiv}>
                            <input type="text" name="email" placeholder="Email" id="email" 
                            value={email}
                            onChange={emailChangeHandler}
                            required
                            />
                        </div>
                        <div className={style.inputdiv}>
                            <input type="password" name="password" placeholder="Password" id="password"
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
                        <p><Link to="/login">Already have an account? Login Now!</Link></p>
                    </form>
                </div>
                
            </Container>
        </section>
    )
}

export default Signup
