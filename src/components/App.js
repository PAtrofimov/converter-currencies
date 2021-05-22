import React from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import Converter from '../containers/Converter';

export const Header = () => (
    <header
        className="mb-3"
        style={{
            position: 'fixed',
            flex: '0 0 auto',
            left: '0',
            top: '0',
            zIndex: '100',
            width: '100%',
            backgroundColor: 'white',
        }}
    >
        <h1 style={{ textAlign: 'center' }}>Convertor of currencies</h1>
    </header>
);

export const Footer = () => (
    <footer
        style={{
            flex: '0 0 auto',
            background: 'white',
            width: '100%',
            display: 'block',
            marginBottom: '-4rem'
        }}
    >
        <p>Courses and base currency are got from http://data.fixer.io/api</p>
        <p>
            Realized such operations as convertation from one currence to another and updating base currence that
            changes the table of courses.
        </p>
        <p style={{ textAlign: 'center' }}>All rights reserved. 2021</p>
    </footer>
);

export const Main = () => (
    <main style={{ flex: '1 0 auto' }}>
        <Container>
            <Row className="justify-content-center">
                <Col style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Converter />
                </Col>
            </Row>
        </Container>
    </main>
);

const App = () => (
    <Jumbotron
        fluid
        style={{ maxWidth: '1000px', margin: '0 auto', minHeight: '100%', display: 'flex', flexDirection: 'column' }}
    >
        <Header />
        <Main />
        <Footer />
    </Jumbotron>
);

export default App;
