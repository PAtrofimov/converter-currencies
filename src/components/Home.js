import React, { useEffect, useState } from 'react';
import { InputGroup, Button, FormControl, Alert } from 'react-bootstrap';
import { convertMoney } from '../redux/converter/converterActions';
import { getConvertingParams } from '../utils';

const Home = ({ data }) => {
    const [text, setText] = useState('');
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {});

    const handleChange = (e) => {
        const { value } = e.target;
        if (!value) {
            return;
        }
        setText(value);
    };

    const handleConvert = (e) => {
        if (!text) {
            return;
        }
        const params = getConvertingParams(text);
        convertMoney(params, data).then((response) => {
            const { value, error } = response;
            setError(error);
            setTotal(value);
        });
    };

    const result = (
        <section>
            <header className="mt-3 mb-3">
                <h1>Convertor of currencies</h1>
                <p>Enter some expression with currencies at this template and get result.</p>
            </header>

            <InputGroup className="mb-3">
                <FormControl type="text" placeholder="150 USD in UAH" value={text} onChange={handleChange} />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={handleConvert}>
                        Convert
                    </Button>
                </InputGroup.Append>
                <FormControl readOnly value={total} />
            </InputGroup>
            {error && <Alert variant="danger">{error}</Alert>}

            <footer className="mb-3 mt-3">
                <p>Courses and base currency are got from http://data.fixer.io/api</p>
                <p>
                    Such operations as convertation from one currence to another and updating base currence are
                    calculated on base them.
                </p>
            </footer>
        </section>
    );

    return result;
};

export default Home;
