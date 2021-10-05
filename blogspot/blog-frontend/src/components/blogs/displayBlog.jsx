import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './index.module.css';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const DisplayBlog = (props) => {

    const {myblogs} = props
    
    
    const card = props.blogs &&
    props.blogs.map((value, index) => (
        <>
        <Col sm={12} md={4} lg={3} key={index} className={styles.div_center}>
            <div className={styles.blockdiv}>
            <Card className={styles.card}>
                <Card.Body className={styles.text_left}>
                    <div className={styles.display_height}>
                        <Card.Title className={styles.card_title}>
                            <div className={styles.right}>
                                <div className={styles.cardicon}>{myblogs && <a href={"/editblog/"+value.blog_id}><FontAwesomeIcon icon={faPencilAlt} /></a>}</div>
                                <div className={styles.cardicon}>{myblogs && <FontAwesomeIcon icon={faTrash} onClick={props.onDelete.bind(this,value.blog_id)}/> }</div>
                            </div>
                            {value.blog_name}
                        </Card.Title>
                        <Card.Text className={styles.card_text}>
                            {value.blog_desc.slice(0,100)}...
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
            <div className={styles.remain_height}> 
                <div className={styles.left}>  
                    <Link to={"/singleblog/"+value.blog_id}><Button className={styles.readmore}>Read More</Button></Link>
                    {/* <a href={"/singleblog/"+value.blog_id}></a> */}
                </div>  
                
            </div>
            </div>
        </Col>
        
        </>
      

    ));
    return (
        
        <Container>
            <Row>
                {card}
            </Row>
        </Container>
    )
}

export default DisplayBlog
