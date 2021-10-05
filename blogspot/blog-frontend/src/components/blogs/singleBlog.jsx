import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './index.module.css'

const Singleblog= (props)=> {
    const [singleblog , setSingleBlog] = useState({})
  
    useEffect(()=>{
        if(!localStorage.getItem("isLogin")){
        window.location.href="/"
        }

        var config = {
            method: 'get',
            url: 'http://localhost:8000/blogs/blogapi/'+props.match.params.id,
            headers: { 
                'Authorization': 'Bearer '+localStorage.getItem('access') 
              }
        };        
        axios(config).then(
            (response) => {
                setSingleBlog(response.data);
                console.log(response.data);
            }
        )      
      },[]);

    return(
        <Container className={styles.container}> 
            <div className={styles.singleblogdiv}>
                <h1 className={styles.blog_heading}>{singleblog.blog_name}</h1>
                <div className={styles.sub_heading}>
                    <h5 >- BY {singleblog.user_id}</h5>
                    <h5 >- {singleblog.blog_updation ? singleblog.blog_updation : singleblog.blog_creation}</h5>
                </div>
                <h4 className={styles.blog_description} >{singleblog.blog_desc}</h4>
                <p className={styles.blog_content}>{singleblog.blog_content}</p>              
            </div>
        </Container>
)
}
export default Singleblog
