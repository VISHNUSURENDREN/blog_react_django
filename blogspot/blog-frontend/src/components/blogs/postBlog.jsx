import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import styles from './index.module.css';


const PostBlog = (props) => {
    const [name , setName] = useState("");
    const [desc , setDesc] = useState("");
    const [content , setContent] = useState("");

    const {isLogin, username, password, refresh } = localStorage

    useEffect(()=>{
        if(!localStorage.getItem("isLogin")){
      window.location.href="/"
    }
    })

    const getName = (event) =>{
        setName(event.target.value)
    }
    const getDesc = (event) =>{
        setDesc(event.target.value)
    }
    const getContent = (event) =>{
        setContent(event.target.value)
    }
    const postsubmit = (e) =>{
        e.preventDefault();
        axios
          .post("http://localhost:8000/blogs/blogapi/", 
          { "user_id":localStorage.getItem("id"), "blog_name" : name, "blog_desc" : desc, "blog_content" : content},
          { headers: { 'Authorization': 'Bearer '+localStorage.getItem('access') }})
          .then((response) => {
            console.log(response);
            console.log(response.data);
            window.location.href="../users/"+localStorage.getItem("id");
          }).catch(
            (error)=>{
                console.log(error.response);
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
    }


    return (
        <section id="postblog">
            <Container className={styles.logindiv}>
                <div className={styles.postcard}>
                    <form onSubmit={postsubmit}>                  
                            <h1>POST A BLOG</h1>
                            <div className={styles.inputdiv}>
                                <label htmlFor="name">Blog Name</label>
                                <textarea name="name" id="name" onChange={getName} value={name} rows="3" col="10">{name}</textarea>
                            </div>
                            <div className={styles.inputdiv}>
                                <label htmlFor="desc">Blog Description</label>
                                <textarea name="desc" id="desc" onChange={getDesc} value={desc} rows="3" col="10">{desc}</textarea>
                            </div>
                            <div className={styles.inputdiv}>
                                <label htmlFor="content">Blog Content</label>
                                <textarea name="content" id="content" onChange={getContent} value={content} rows="3" col="10">{content}</textarea>
                            </div>
                            <div className={styles.buttondiv}>
                                <Button type="submit">POST BLog</Button>
                            </div>
                    </form>
                </div>
            </Container>
        </section>
    )
}

export default PostBlog
