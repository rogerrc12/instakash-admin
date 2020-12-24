import React, { useEffect, useState } from "react";
import { convertHexToRGBA, checkInterplaza } from "../../helpers/functions";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { getExchangeDetails, createInvoice } from "../../store/actions";
import { Card, CardBody, Spinner, Badge, Row, Col, Button } from "reactstrap";

import EditTransaction from "./EditTransaction";
import CopyButton from "../../components/UI/CopyButton";
import CancelForm from "../../components/Transactions/CancelForm";
import ApproveForm from "../../components/Transactions/ApproveForm";

const TransactionDetails = (props) => {
  const [edit, setEdit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [approve, setApprove] = useState(false);

  const { id, getExchangeDetails, exchangeDetails, isLoading, banks, isProcessing, connection, close } = props;

  useEffect(() => {
    if (!isNaN(id)) getExchangeDetails(id);
  }, [getExchangeDetails, id]);

  const setCancelState = () => {
    setApprove(false);
    setCancel(true);
  };

  const setApproveState = (status) => {
    status === 7 ? approveExchange() : setApprove(true);
    setCancel(false);
  };

  const closeApprove = () => setApprove(false);

  const cancelExchange = (message) => props.decline(id, connection, close, message);
  const approveExchange = (invoice) => {
    props.approve(id, close, closeApprove, connection, exchangeDetails, invoice);
  };
  const createInvoice = () => props.createInvoice(id, close, exchangeDetails, props.updateTable);

  let DetailsComponent;
  if (isLoading) DetailsComponent = <Spinner color='#fff' />;

  if (exchangeDetails) {
    DetailsComponent = (
      <>
        <div className='invoice-title d-flex justify-content-between align-items-center mb-4'>
          <h4 className='font-size-16'>
            <span>Solicitud # {exchangeDetails.operacion}</span>
            <CopyButton textToCopy={exchangeDetails.operacion} />
          </h4>
          <Badge className='btn py-2 font-size-12' style={{ color: "#FFF", backgroundColor: convertHexToRGBA(exchangeDetails.estado.color, 75) }} pill>
            {exchangeDetails.estado.estado}
          </Badge>
        </div>
        <Row>
          <Col md='6 text-left'>
            <h5 style={{ color: "#a6b0cf" }}>Datos de la operación</h5>
            <p style={{ lineHeight: 2.5 }}>
              <span className='mr-2'>
                <b>Fecha:</b>
              </span>
              {moment(exchangeDetails.fecha).format("DD-MM-YYYY hh:mm a")}
              <br />
              <span className='mr-2'>
                <b>Nro. de transferencia:</b>
              </span>
              {exchangeDetails.numeroTransferencia ? exchangeDetails.numeroTransferencia : "Sin recibir"}
              <br />
              <span className='mr-2'>
                <b>Monto a recibir:</b>
              </span>
              {exchangeDetails.montoEnvia.signo + "  " + exchangeDetails.montoEnvia.monto.toFixed(2)}
              <br />
              <span className='mr-2'>
                <b>Banco de origen:</b>
              </span>
              <span>
                {exchangeDetails.bancoEnvia.nombre}
                <img className='ml-2' src={`data:image/png;base64, ${exchangeDetails.bancoEnvia.imagen}`} alt='banco' width={20} />
              </span>
              <br />
              <span className='mr-2'>
                <b>Factura generada:</b>
              </span>
              <span className={`badge font-size-12 text-uppercase text-${exchangeDetails.factura ? "success" : "warning"}`}>
                {exchangeDetails.factura ? "Creada" : "Sin crear"}
              </span>
              <br />
              <span className='mr-2'>
                <b>{exchangeDetails.tieneTasaPreferencia ? "Tasa de cambio preferencial:" : "Tasa de cambio:"}</b>
              </span>
              {exchangeDetails.tieneTasaPreferencia ? exchangeDetails.customTasaPreferencial : exchangeDetails.tasaCambio}
            </p>
          </Col>
          <Col className='text-right' md='6'>
            <h5 style={{ color: "#a6b0cf" }}>Datos {exchangeDetails.ruc ? "de la empresa" : "del cliente"}</h5>
            <p style={{ lineHeight: 2.5 }}>
              {exchangeDetails.ruc && (
                <>
                  <span className='mr-2'>
                    <b>Razón social:</b>
                  </span>
                  {exchangeDetails.empresa}
                  <br />
                  <span className='mr-2'>
                    <b>RUC:</b>
                  </span>
                  {exchangeDetails.ruc}
                  <br />
                </>
              )}
              <span className='mr-2'>
                <b>Nombre del {exchangeDetails.ruc ? "Representante legal" : "Usuario"}:</b>
              </span>
              {exchangeDetails.nombre}
              <br />
              <span className='mr-2'>
                <b>Documento:</b>
              </span>
              {exchangeDetails.documento}
              <br />
              <span className='mr-2'>
                <b>Teléfono:</b>
              </span>
              {exchangeDetails.telefono}
              <CopyButton textToCopy={exchangeDetails.telefono} />
              <br />
              <span className='mr-2'>
                <b>Correo electrónico:</b>
              </span>
              {exchangeDetails.correo}
              <br />
              <span className='mr-2'>
                <b>Banco a enviar:</b>
              </span>
              <span>
                {exchangeDetails.bancoRecibe.nombre}
                <img className='ml-2' src={`data:image/png;base64, ${exchangeDetails.bancoRecibe.imagen}`} alt={exchangeDetails.bancoRecibe.nombre} width={20} />
              </span>
              <br />
              <span className='mr-2'>
                <b>Tipo de cuenta:</b>
              </span>
              {exchangeDetails.tipoCuenta}
              <br />
              <span className='mr-2'>
                <b>Número de cuenta:</b>
              </span>
              {exchangeDetails.numeroCuenta}
              <CopyButton textToCopy={exchangeDetails.numeroCuenta} />
              <br />
              {checkInterplaza(exchangeDetails.bancoRecibe.id, exchangeDetails.numeroCuenta)}
              {exchangeDetails.datosTercero.titular && (
                <>
                  <span className='mr-2'>
                    <b>Titular de la cuenta:</b>
                  </span>
                  {exchangeDetails.datosTercero.titular}
                  <br />
                  <span className='mr-2'>
                    <b>Documento del titular:</b>
                  </span>
                  {exchangeDetails.datosTercero.documento}
                  <br />
                </>
              )}
              <span className='mr-2'>
                <b>Monto a enviar :</b>
              </span>
              {exchangeDetails.montoRecibe.signo + " " + exchangeDetails.montoRecibe.monto.toFixed(2)}
              <CopyButton textToCopy={exchangeDetails.montoRecibe.monto} />
            </p>
          </Col>
          <ButtonsComponent
            role={props.user.idRol}
            createInvoice={createInvoice}
            details={exchangeDetails}
            edit={() => setEdit(true)}
            approve={setApproveState.bind(null, exchangeDetails.estado.id)}
            cancel={setCancelState}
          />

          {approve && <ApproveForm approve={approveExchange} />}
          {cancel && <CancelForm decline={cancelExchange} />}
        </Row>
      </>
    );
  }

  return (
    <Card>
      <CardBody className='text-center'>
        {edit ? (
          <EditTransaction update={props.updateTable} banks={banks} isProcessing={isProcessing} id={id} cancelEdit={() => setEdit(false)} details={exchangeDetails} />
        ) : (
          DetailsComponent
        )}
      </CardBody>
    </Card>
  );
};

export const ButtonsComponent = (props) => {
  const { details, role, edit, approve, cancel, createInvoice } = props;

  const editTransactionButton =
    (details.estado.id === 2 || details.estado.id === 7) && (role === 3 || role === 1) ? (
      <Button color='secondary' onClick={edit}>
        Editar transacción
      </Button>
    ) : null;

  const processTransactionButton =
    details.estado.id === 7 || details.estado.id === 1 ? (
      <Button color='success' className='mr-2' onClick={approve}>
        {details.estado.id === 7 ? "Validar" : "Aprobar"}
      </Button>
    ) : null;

  const createInvoiceButton = details.estado.id === 3 && !details.factura && (
    <Button color='primary' className='ml-auto' onClick={createInvoice}>
      Generar factura
    </Button>
  );

  const cancelTransactionButton =
    details.estado.id === 1 || details.estado.id === 7 || details.estado.id === 2 ? (
      <Button color='danger' onClick={cancel}>
        Cancelar
      </Button>
    ) : null;

  return (
    <Col className='mt-3 d-flex items-center justify-content-between'>
      {editTransactionButton}
      {createInvoiceButton}
      <div>
        {processTransactionButton}
        {cancelTransactionButton}
      </div>
    </Col>
  );
};

const mapStateToProps = (state) => {
  const { banks } = state.Banks;
  const { user } = state.Login;
  const { exchangeDetails } = state.CurrencyExchange;
  return { exchangeDetails, banks, user };
};

export default connect(mapStateToProps, { getExchangeDetails, createInvoice })(React.memo(TransactionDetails));
