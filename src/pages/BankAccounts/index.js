import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCbAccounts, editCbAccount } from "../../store/actions";
import { Container, Col, Row, Alert } from "reactstrap";

import AccountsTable from "./AccountsTable";
import AddAccount from "./AddAccount";

const BankAccounts = (props) => {
  const [editData, setEditData] = useState(null);
  const [addState, setAddState] = useState(false);
  const [accountsList, setAccountsList] = useState([]);

  const addAccountHandler = () => {
    setEditData(null);
    setAddState(true);
  };

  const { getCbAccounts, editCbAccount, connection, accounts } = props;

  useEffect(() => {
    getCbAccounts();
  }, [getCbAccounts]);

  useEffect(() => {
    if (accounts.length > 0) setAccountsList(accounts);
  }, [accounts]);

  useEffect(() => {
    if (connection) {
      connection.on("ActualizarSaldos", (response) => setAccountsList(response));
    }
  }, [connection]);

  return (
    <div className='page-content'>
      <Container fluid>
        <Row>
          <Col lg='8'>
            <AccountsTable isLoading={props.isLoading} accounts={accountsList} edit={setEditData} add={addAccountHandler} />
          </Col>
          <Col lg='4'>
            {props.error && <Alert color='danger'>{props.error}</Alert>}
            {props.success && <Alert color='success'>{props.success}</Alert>}
            {(addState || editData) && <AddAccount data={editData} edit={editCbAccount} reset={setEditData} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { error, success, accounts, isLoading } = state.BankAccounts;
  const { connection } = state.HubConnection;
  return { error, connection, success, accounts, isLoading };
};

export default connect(mapStateToProps, { getCbAccounts, editCbAccount })(BankAccounts);
