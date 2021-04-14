import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Currencies from './Currencies';
import Home from './Home';

const Converter = ({ data, onUpdateBaseCurrency }) => {
    useEffect(() => {});

    const result = (
        <section>
            <Tabs defaultActiveKey="home" id="currency-tab">
                <Tab eventKey="home" title="Home">
                    <Home data={data} />
                </Tab>
                <Tab eventKey="currencies" title="Currencies">
                    <Currencies data={data} onUpdateBaseCurrency={onUpdateBaseCurrency} />
                </Tab>
            </Tabs>
        </section>
    );

    return result;
};

export default Converter;
