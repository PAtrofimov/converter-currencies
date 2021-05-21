import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';
import { getCurrencies, saveUserBaseCurrency } from '../redux/converter/converterActions';
import ConvertForm from '../components/ConvertForm';
import Currencies from '../components/Currencies';
import { allTypesRatesSelector, firstLettersSelector } from '../selectors';

function Converter({ currencyData, firstLetters, convertedData, getCurrencies, saveUserBaseCurrency }) {
    const handleUpdateBaseCurrency = (data) => {
        saveUserBaseCurrency(data);
    };

    useEffect(() => {
        getCurrencies();
    }, []);
    return (
        <>
            {currencyData.loading ? (
                <Spinner animation="border" role="status" style={{ textAlign: 'center' }}>
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : currencyData.error ? (
                <Alert variant="danger">{currencyData.error}</Alert>
            ) : (
                <>
                    <ConvertForm data={currencyData.data} />
                    <Currencies
                    data={currencyData.data}
                    convertedRates={convertedData}
                    firstLetters={firstLetters}
                    onUpdateBaseCurrency={handleUpdateBaseCurrency} />
                </>
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        currencyData: state.currency,
        firstLetters: firstLettersSelector(state.currency),
        convertedData: allTypesRatesSelector(state.currency)
    };
};

const actions = { getCurrencies, saveUserBaseCurrency };

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Converter);
