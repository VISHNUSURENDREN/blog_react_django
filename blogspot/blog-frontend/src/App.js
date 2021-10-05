import React, { useState, useEffect } from 'react';
import axios from "axios";

import Login from './components/login';
import './App.css';
import Home from './components/home/home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} 
from 'react-router-dom';
import PostBlog from './components/blogs/postBlog';
import Navigation from './components/navigation/navbar';
import MyBlogs from './components/blogs/myBlogs';
import Signup from './components/signup/signup';
import Landing from './components/landing/landing';
import Singleblog from './components/blogs/singleBlog';
import EditBlog from './components/blogs/editBlog';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    console.log('calling useEffect');
    const isLogin = localStorage.getItem('isLogin');
    if(isLogin === '1'){
      setIsLoggedIn(true);
    }

  },[]);

  const loginHandler = (email, password) => {
    axios
          .post("http://localhost:8000/users/login/", { "username" : email, "password" : password},)
          .then((response) => {
            console.log(response);
            console.log(response.data);
            if (response.data.success){
              localStorage.setItem('isLogin','1');
              localStorage.setItem('username',response.data.username);
              localStorage.setItem('id',response.data.id);
              localStorage.setItem('password',response.data.password);
              localStorage.setItem('access',response.data.access);
              localStorage.setItem('refresh',response.data.refresh);
              setIsLoggedIn(true);
              window.location.href="/"
            }
            else{
              alert(response.data.error)
            }
            
          });   
  };

  const signupHandler = (user, fname, lname, email, password) =>{
    axios
          .post("http://localhost:8000/users/usertable/", { "username" : user, "first_name": fname, "last_name": lname, "email": email, "password" : password})
          .then((response) => {
            console.log(response);
            console.log(response.data);
            if (response.data.success){
              alert(response.data.success)
              window.location.href="/login"
            }
            else{
              alert(response.data.error)
            }          
          }); 
  }
 

  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href="/"
  };

  const id = localStorage.getItem("id");
  const path = "/users/"+id;

  return (
    <>   
    <Navigation isLoggedIn = {isLoggedIn} logout={logoutHandler}/>
      <Router>
        <Switch>
            {!isLoggedIn && <Route exact path="/">
              <Landing/>
            </Route> }
            {isLoggedIn && <Route exact path="/">
              <Home onLogout={logoutHandler} isLoggedIn={isLoggedIn}/>
            </Route>}
            <Route path="/login">
            <Login onLogin={loginHandler} />
            </Route>
            <Route path="/signup">
              <Signup onSignup={signupHandler} />
            </Route>
            <Route path="/postblog">
              <PostBlog />
            </Route>
            <Route path="/singleblog/:id" component={Singleblog}></Route>
            <Route path="/editblog/:id" component={EditBlog}></Route>
            { id && <Route path={path} >
              <MyBlogs />
            </Route>}

        </Switch>
      </Router>
    </>
    
  );
}

export default App;
