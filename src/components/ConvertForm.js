import React, { useState } from 'react';
import { InputGroup, Button, FormControl, Alert } from 'react-bootstrap';
import { convertMoney } from '../redux/converter/converterActions';
import { getConvertingParams } from '../utils';

const ConvertForm = ({ data }) => {
    const [text, setText] = useState('');
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');

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
             <InputGroup className="mb-3">
                <FormControl type="text" placeholder="150 USD in UAH" value={text} onChange={handleChange} data-testid = "convert-input" />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={handleConvert}>
                        Convert
                    </Button>
                </InputGroup.Append>
                <FormControl readOnly value={total} data-testid = "convert-result" />
            </InputGroup>
            {error && <Alert variant="danger">{error}</Alert>}
        </section>
    );

    return result;
};

export default ConvertForm;
