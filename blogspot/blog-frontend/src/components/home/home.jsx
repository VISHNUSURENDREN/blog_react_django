import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayBlog from '../blogs/displayBlog';
import Container from 'react-bootstrap/Container';
import styles from './index.module.css';

const Home = (props)=> {
    const [blogs , setBlogs] = useState([])

    const {isLoggedIn} = props
    const {isLogin, username, password, refresh } = localStorage

    useEffect(()=>{

        console.log('calling useEffect');
        console.log(localStorage)
        var config = {
            method: 'get',
            url: 'http://localhost:8000/blogs/blogapi/',
            headers: { 
                'Authorization': 'Bearer '+localStorage.getItem('access') 
              }
        };
          
        axios(config).then(
            (response) => {
                setBlogs(response.data);
                console.log(response.data);
            }
        ).catch(
            (error)=>{
                if(error.response.data.code=="token_not_valid"){
                    axios.post("http://localhost:8000/api/token/refresh/",
                    { "username" :username , "password" : password, "refresh" : refresh})
                    .then((response)=>{
                        console.log("refreshing");
                        localStorage.setItem("access",response.data.access)
                        window.location.reload()
                    }).catch(
                        (error)=>{
                            localStorage.clear()
                            window.location.href = "/"
                        }
                    )
                }
            }
        ) 
      },[]);


    return (
        <section className={styles.home }>
            <Container className={styles.container}>
                <h2>Blogs from around the world</h2>
                <DisplayBlog blogs={blogs}/>           
            </Container>
        </section>
    )
}

export default Home
