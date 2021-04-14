import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NotFound = () => (
    <Jumbotron fluid>
        <Container>
            <Row  className="justify-content-md-center">
                <Col>
                    <header className="not-found" style={{textAlign:"center"}}>
                        <div className="not-found-error">404 Not Found </div>
                        {'Go to '}
                        <NavLink to="/">Home</NavLink>
                        {' page'}
                    </header>
                </Col>
            </Row>
        </Container>
    </Jumbotron>
);

export default NotFound;