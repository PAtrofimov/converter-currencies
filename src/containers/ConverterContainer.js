import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Container, Jumbotron, Row, Spinner } from 'react-bootstrap';
import { getCurrencies, saveUserBaseCurrency } from '../redux/converter/converterActions';
import Converter from '../components/Converter';

function ConverterContainer({ currencyData, getCurrencies, saveUserBaseCurrency }) {
    const handleUpdateBaseCurrency = (data) => {
        saveUserBaseCurrency(data);
    };

    useEffect(() => {
        getCurrencies();
    }, []);
    return (
        <Jumbotron fluid>
            <Container>
                <Row className="justify-content-center">
                    {currencyData.loading ? (
                        <Spinner animation="border" role="status" style={{ textAlign: 'center' }}>
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    ) : currencyData.error ? (
                        <Alert variant="danger">{currencyData.error}</Alert>
                    ) : (
                        <Col>
                            <Converter data={currencyData.data} onUpdateBaseCurrency={handleUpdateBaseCurrency} />
                        </Col>
                    )}
                </Row>
            </Container>
        </Jumbotron>
    );
}

const mapStateToProps = (state) => {
    return {
        currencyData: state.currency,
    };
};

const actions = { getCurrencies, saveUserBaseCurrency };

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer);
