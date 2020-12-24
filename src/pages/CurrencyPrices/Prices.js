import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { clientInstance as axios } from "../../helpers/AuthType/axios";
import moment from "moment-timezone";

//Components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/UI/Table";

const Prices = React.forwardRef((props, ref) => {
  const data = {
    columns: [
      {
        title: "Moneda",
        field: "currency",
        width: 160,
      },
      {
        title: "compra",
        field: "amountBuy",
        cellStyle: { fontWeight: "bold" },
        width: 150,
      },
      {
        title: "venta",
        field: "amountSell",
        cellStyle: { fontWeight: "bold" },
        width: 150,
      },
      {
        title: "Fecha",
        field: "date",
        width: 170,
      },
    ],
    rows: (query) =>
      new Promise((resolve, reject) => {
        const url = `/HistorialMoneda/ObtenerHistorial?Pag=${query.page + 1}&Cant=${query.pageSize}&Filtro=${query.search}`;

        axios
          .get(url)
          .then((result) => {
            props.setLastPrice(result.data.historial[0]);
            const data = result.data.historial.map((price) => ({
              currency: `${price.currencyType.currencyName} (${price.currencyType.symbol})`,
              amountBuy: price.totalBuy.toFixed(3),
              amountSell: price.totalSale.toFixed(3),
              date: moment(price.dateHistorical).format("DD/MM/YYYY hh:mm a"),
            }));
            props.setIsLoading(false);
            resolve({
              data,
              page: query.page,
              totalCount: result.data.total,
            });
          })
          .catch((err) => reject("Ha ocurrido un error: " + err));
      }),
  };

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Precio del dolar' breadcrumbItem='Precio del dolar actual ($)' />

      <Row>
        <Col className='col-12'>
          <Card>
            <CardBody>
              <Table ref={ref} columns={data.columns} rows={data.rows} options={{ sorting: true, loadingType: "linear", pageSize: 10, pageSizeOptions: [10, 25, 100] }} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default Prices;
