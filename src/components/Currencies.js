import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';

const Currencies = ({ data, onUpdateBaseCurrency }) => {
    const [baseCur, setBaseCur] = useState(data?.userBase);
    const handleChange = ({ target }) => {
        const value = target.value;
        if (!value) {
            return;
        }
        setBaseCur(value);
        onUpdateBaseCurrency(value);
    };
    let courseUserCur = 1;

    let rates = Object.entries(data.rates);

    if (data?.userBase !== data?.base) {
        const [, value] = rates.find(([key, value]) => key === data?.userBase);
        courseUserCur = value;
    }

    rates = rates.map(([key, value]) => {
        return [key, Math.round(1e10 * (courseUserCur / value)) / 1e10];
    });

    const result = (
        <section>
            <Form>
                <Form.Group controlId="base-currency-select">
                    <Form.Label>Base currency</Form.Label>
                    <Form.Control as="select" value={baseCur} onChange={handleChange}>
                        {[...Object.keys(data.rates)].sort().map((el) => {
                            return (
                                <option key={el} value={el}>
                                    {el}
                                </option>
                            );
                        })}
                    </Form.Control>
                </Form.Group>
            </Form>
            <p>The table of courses on base currency is actual on {data?.date ?? Date.now().toLocaleDateString()}.</p>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Currency</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map(([key, value], index) => {
                        return (
                            <tr key={key}>
                                <td>{index + 1}</td>
                                <td>1 {key}</td>
                                <td>{value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </section>
    );

    return result;
};

export default Currencies;
