import React from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import Converter from '../containers/Converter';

export const Header = () => (
    <header className="mt-3 mb-3">
        <h1>Convertor of currencies</h1>
        <p>Enter some expression with currencies at this template and get result.</p>
    </header>
);

export const Footer = () => (
    <footer className="mb-3 mt-3">
        <p>Courses and base currency are got from http://data.fixer.io/api</p>
        <p>
            Realized such operations as convertation from one currence to another and updating base currence that changes the table of courses.
        </p>
        <p>All rights reserved. 2021</p>
    </footer>
);

export const Main = () => (
    <main>
        <Converter />
    </main>
);

const App = () => (
    <Jumbotron fluid>
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <Header />
                    <Main />
                    <Footer />
                </Col>
            </Row>
        </Container>
    </Jumbotron>
);

export default App;
