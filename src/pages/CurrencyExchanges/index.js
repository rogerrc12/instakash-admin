import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Modal, Button, ModalBody, ModalHeader, ModalFooter, Alert } from "reactstrap";
import { connect } from "react-redux";
import { approveExchange, declineExchange } from "../../store/actions";

import Transactions from "./Transactions";
import TransactionDetails from "./TransactionDetails";

const CurrencyExchanges = (props) => {
  const [modal, setModal] = useState(false);
  const [trxId, setTrxId] = useState(null);
  const { approveExchange, declineExchange, isLoading, isProcessing, user, connection } = props;
  const tableRef = useRef();

  const togglemodal = (trxId) => {
    setModal((prevState) => !prevState);
    setTrxId(trxId);
  };

  const updateTable = () => (tableRef.current ? tableRef.current.onQueryChange() : false);

  let role = null;
  if (user) role = user.idRol;

  useEffect(() => {
    if (!role) return;

    if (connection) {
      let connectionString = role === 3 ? "NotificarAnalistaCD" : role === 2 ? "NotificarOperadorCD" : "NotificarAdminCD";
      connection.on(connectionString, () => updateTable());
    }
  }, [role, connection]);

  return (
    <>
      <div className='page-content'>
        <Container fluid>
          <Row>
            <Col lg='12'>
              <Transactions updateTable={updateTable} ref={tableRef} role={role} isLoading={isLoading} openModal={togglemodal} />
            </Col>
          </Row>
        </Container>
      </div>
      <Modal size='xl' isOpen={modal} role='dialog' autoFocus={true} centered={true} className='exampleModal' tabIndex='-1' toggle={togglemodal}>
        <div className='modal-content'>
          <ModalHeader toggle={togglemodal}>Detalles de la transacción</ModalHeader>
          <ModalBody className='py-0'>
            <TransactionDetails
              updateTable={updateTable}
              connection={connection}
              id={trxId}
              isLoading={isLoading}
              isProcessing={isProcessing}
              approve={approveExchange}
              decline={declineExchange}
              close={togglemodal}
            />
            <Col md='6' style={{ marginLeft: 0, marginTop: 10 }}>
              {props.error ? <Alert color='danger'>{props.error}</Alert> : null}
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button type='button' color='secondary' onClick={togglemodal}>
              Cerrar
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.Login;
  const { error, isLoading, isProcessing } = state.CurrencyExchange;
  const { connection } = state.HubConnection;
  return { error, isLoading, isProcessing, user, connection };
};

export default connect(mapStateToProps, { approveExchange, declineExchange })(CurrencyExchanges);
