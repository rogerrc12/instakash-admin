import React from "react";
import { Row, Col, Card, CardBody, Badge, Button } from "reactstrap";
import { convertHexToRGBA } from "../../helpers/functions";
import moment from "moment-timezone";

import { clientInstance as axios } from "../../helpers/AuthType/axios";

//Components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/UI/Table";

const Transactions = React.forwardRef((props, ref) => {
  const data = {
    columns: [
      {
        title: "Operación",
        field: "pedidoId",
        cellStyle: { fontWeight: "bold" },
        width: 140,
      },
      {
        title: "Fecha",
        field: "date",
      },
      {
        title: "Usuario",
        field: "user",
      },
      {
        title: "Envia",
        field: "amountSend",
        render: (rowData) => <b>{rowData.amountSend}</b>,
      },
      {
        title: "Recibe",
        field: "amountReceive",
        render: (rowData) => <b>{rowData.amountReceive}</b>,
      },
      {
        title: "O",
        field: "originBank",
        render: (rowData) => <img width={20} src={`data:image/png;base64, ${rowData.originBank}`} alt='banco' />,
        width: 130,
      },
      {
        title: "D",
        field: "destinationBank",
        render: (rowData) => <img width={20} src={`data:image/png;base64, ${rowData.destinationBank}`} alt='banco' />,
        width: 130,
      },
      {
        title: "Estado",
        field: "status",
        width: 100,
        render: (rowData) => (
          <Badge className='btn py-2 font-size-12' style={{ color: "#FFF", backgroundColor: convertHexToRGBA(rowData.statusColor, 75) }} pill>
            {rowData.statusName}
          </Badge>
        ),
      },
      {
        title: "F",
        field: "invoiceStatus",
        cellStyle: { textTransform: "uppercase" },
        width: 100,
        render: (rowData) => <span className={rowData.invoiceStatus ? "text-success" : "text-warning"}>{rowData.invoiceStatus ? "SI" : "NO"}</span>,
      },
      {
        title: "Acción",
        field: "action",
        width: 150,
        render: (rowData) => (
          <button className='btn-rounded waves-effect waves-light btn btn-blue btn-sm font-size-13' onClick={props.openModal.bind(this, rowData.id)}>
            Detalles
          </button>
        ),
      },
    ],
    rows: (query) =>
      new Promise((resolve, reject) => {
        const sort = query.orderBy && query.orderBy.field === "status" ? "TransactionState.Description" : "PaymentDate";
        const order = query.orderBy && query.orderBy.field === "status" && query.orderDirection === "asc" ? query.orderDirection : "desc";
        const url = `/CambioDivisa/ObtenerCambiosDivisa?Pag=${query.page + 1}&Cant=${query.pageSize}&Filtro=${query.search}&Sort=${sort}&Order=${order}`;
        axios
          .get(url)
          .then((result) => {
            const data =
              result.data.datos.length > 0
                ? result.data.datos.map((exchange) => ({
                    id: exchange.id,
                    pedidoId: exchange.operacion,
                    date: moment(exchange.fecha).tz("America/Lima").format("DD/MM/YYYY hh:mm a"),
                    user: exchange.nombre,
                    originBank: exchange.bancoEnvia.imagen,
                    destinationBank: exchange.bancoRecibe.imagen,
                    amountReceive: exchange.montoRecibe.signo + " " + exchange.montoRecibe.monto.toFixed(2),
                    amountSend: exchange.montoEnvia.signo + " " + exchange.montoEnvia.monto.toFixed(2),
                    statusId: exchange.estado.id,
                    statusName: exchange.estado.estado,
                    statusColor: exchange.estado.color,
                    invoiceStatus: exchange.factura,
                  }))
                : [];

            resolve({
              data,
              page: query.page,
              totalCount: result.data.total,
            });
          })
          .catch((error) => reject(error));
      }),
  };

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Transacciones' breadcrumbItem='Transacciones recibidas (cambios de divisa)' />

      <Row>
        <Col className='col-12'>
          <Button className='ml-3 mb-4' color='primary' onClick={props.updateTable}>
            Actualizar operaciones
          </Button>

          <Card>
            <CardBody>
              <Table ref={ref} columns={data.columns} rows={data.rows} options={{ sorting: true, loadingType: "linear", pageSize: 50, pageSizeOptions: [50, 100, 200] }} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default React.memo(Transactions);
