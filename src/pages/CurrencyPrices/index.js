import React, { useState, useRef } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import { connect } from "react-redux";
import { addCurrencyPrice } from "../../store/actions";

import PricesTable from "./Prices";
import AddCurrency from "./AddCurrencyPrice";

const CurrencyPrices = (props) => {
  const { addCurrencyPrice, currencyPrices, isUpdating } = props;
  const [lastPrice, setLastPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef();

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col md='8'>
            <PricesTable ref={tableRef} setIsLoading={setIsLoading} setLastPrice={setLastPrice} prices={currencyPrices} />
          </Col>
          <Col md='4'>
            <AddCurrency
              updateTable={tableRef.current && tableRef.current.onQueryChange}
              isUpdating={isUpdating}
              isLoading={isLoading}
              addCurrency={addCurrencyPrice}
              currentPrice={lastPrice}
            />
            {props.success && <Alert color='success'>{props.success}</Alert>}
            {props.error && <Alert color='danger'>{props.error}</Alert>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isUpdating, success, error } = state.CurrencyPrices;
  return { isUpdating, success, error };
};

export default connect(mapStateToProps, { addCurrencyPrice })(CurrencyPrices);
