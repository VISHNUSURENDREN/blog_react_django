import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayBlog from './displayBlog';
import Container from 'react-bootstrap/Container';
import styles from './index.module.css'

const MyBlogs = (props)=> {
    const [blogs , setBlogs] = useState([])

    useEffect(()=>{
        if(!localStorage.getItem("isLogin")){
            window.location.href="/"
          }
        var config = {
            method: 'get',
            url: 'http://localhost:8000/blogs/userblogs/'+localStorage.getItem("id"),
            headers: { 
                'Authorization': 'Bearer '+localStorage.getItem('access') 
              }
        };
          
        axios(config).then(
            (response) => {
                setBlogs(response.data);
            }
        )      
      },[]);

    
    function deleteHandler(id) {
        console.log(id)
        axios.delete('http://localhost:8000/blogs/blogapi/'+id,
        { headers: { 'Authorization': 'Bearer '+localStorage.getItem('access') }})
        .then(() => {
            alert('Delete successful');  
            var config = {
                method: 'get',
                url: 'http://localhost:8000/blogs/userblogs/'+localStorage.getItem("id"),
                headers: { 
                    'Authorization': 'Bearer '+localStorage.getItem('access') 
                  }
            };
              
            axios(config).then(
                (response) => {
                    setBlogs(response.data);
                }
            )    
        });
    }
    

  

    return (
        <Container className={styles.container}>
            <h2 className={styles.h2_mystory}>My Stories</h2>
            <DisplayBlog blogs={blogs} myblogs={true} onDelete={deleteHandler} />
        </Container>
    )
}

export default MyBlogs
