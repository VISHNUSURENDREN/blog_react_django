import React from 'react'
import Container from 'react-bootstrap/Container'
import stylecss from "./landing.module.css"
import {Link} from "react-router-dom"
function Landing() {
    return (
        <section className={stylecss.container}>
            <header className={stylecss.flexcenter}>      
                <Container>
                    <div className={stylecss.innercontainer}>
                        <h1><span>B</span>log<span>s</span>pace</h1>
                        <p>Where you can share your skills, stories or whatever's on your mind.</p>
                        <button ><Link to="/signup" className={stylecss.nounderline}>Create Account</Link></button>
                    </div>
                </Container>
           </header>
       </section>
       
    )
}

export default Landing
