import React, { useState } from 'react';
import { Table, Form, Pagination, InputGroup, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

export const Letter = ({ handleLetterClick, value }) => (
    <Button
        onClick={handleLetterClick}
        value={value}
        style={{ flex: '0 1 auto', background: 'lightgrey', color: 'black', borderColor: 'grey', fontWeight: '500' }}
    >
        {value}
    </Button>
);

export const LettersToolbar = ({ firstLetters, handleLetterClick }) => (
    <ButtonToolbar>
        <ButtonGroup className="mr-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {firstLetters.map((el, index) => (
                <Letter key={String(index)} handleLetterClick={handleLetterClick} value={el} />
            ))}
        </ButtonGroup>
    </ButtonToolbar>
);

export const CurrenciesRow = ({ name, value }) => (
    <tr>
        <td>1 {name}</td>
        <td>{value}</td>
    </tr>
);

export const CurrenciesTable = ({ rates }) => {
    return (
        <Table
            striped
            bordered
            hover
            size="sm"
            style={{ textAlign: 'center', margin: '0 auto', maxWidth: '500px' }}
        >
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Course</th>
                </tr>
            </thead>
            <tbody>
                {rates.map(([key, value]) => (
                    <CurrenciesRow key={key} name={key} value={value} />
                ))}
            </tbody>
        </Table>
    );
};

export const BaseCurrencyInput = ({ baseCur, handleChange, rates }) => (
    <Form className="mt-3">
        <Form.Group controlId="base-currency-select">
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>Base currency</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    as="select"
                    value={baseCur}
                    onChange={handleChange}
                    data-testid="base-currency"
                    style={{ maxWidth: '100px' }}
                >
                    {[...Object.keys(rates)].sort().map((el) => (
                        <option key={el} value={el} data-testid={'currency-option-' + el}>
                            {el}
                        </option>
                    ))}
                </Form.Control>
            </InputGroup>
        </Form.Group>
    </Form>
);

export const CurrenciesPagination = ({ numberPages, handleClick }) => {
    const pageItems = Array(numberPages)
        .fill(0)
        .map((el, index) => {
            const number = index + 1;
            return (
                <Pagination.Item key={number} active={index === number} onClick={() => handleClick(number)}>
                    {number}
                </Pagination.Item>
            );
        });

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination>{pageItems}</Pagination>
        </div>
    );
};

const Currencies = ({ data, convertedRates, firstLetters, onUpdateBaseCurrency }) => {
    const [baseCur, setBaseCur] = useState(data?.userBase);
    const [currentPage, setСurrentPage] = useState(1);
    const [letter, setLetter] = useState('');

    const handleChange = ({ target }) => {
        const value = target.value;
        if (!value) {
            return;
        }
        setBaseCur(value);
        onUpdateBaseCurrency(value);
    };

    const handleLetterClick = ({ target }) => {
        const value = target.value;
        setLetter(value);
        setСurrentPage(1);
    };
    const { numberPages, rates: allRates } = convertedRates[letter];
    const rates = allRates.length >= currentPage ? allRates[currentPage - 1] : [];

    return (
        <section>
            <BaseCurrencyInput rates={data.rates} baseCur={baseCur} handleChange={handleChange} />
            <h3 style={{ textAlign: 'center' }}>
                The table of courses to {baseCur} is actual on {data?.date ?? new Date().toLocaleDateString()}.
            </h3>
            <LettersToolbar firstLetters={firstLetters} handleLetterClick={handleLetterClick} />
            <CurrenciesTable rates={rates} />
            {numberPages > 1 && <CurrenciesPagination numberPages={numberPages} handleClick={setСurrentPage} />}
        </section>
    );
};

export default Currencies;
