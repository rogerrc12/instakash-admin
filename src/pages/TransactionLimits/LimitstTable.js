import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

import Table from "../../components/UI/Table";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const LimitstTable = (props) => {
  const data = {
    columns: [
      {
        field: "currency",
        title: "Moneda",
      },
      {
        field: "transactionLimit",
        title: "Limites / T",
        render: (rowData) => (rowData.transactionLimit ? rowData.currencySymbol + "  " + rowData.transactionLimit : <span className={"fa-lg fas fa-times-circle text-danger"} />),
      },
      {
        field: "minimumTransaction",
        title: "Mínimo / T",
        render: (rowData) => rowData.currencySymbol + "  " + rowData.minimumTransaction,
      },
      {
        field: "limitPerDay",
        title: "Limites / D",
        render: (rowData) => (rowData.limitPerDay ? rowData.currencySymbol + "  " + rowData.limitPerDay : <span className='fa-lg fas fa-times-circle text-danger' />),
      },
    ],
    rows:
      props.data.length > 0
        ? props.data.map((limit) => ({
            idLimit: limit.idLimitCurrency,
            idCurrency: limit.idCurrencyType,
            currency: limit.currencyType.currencyName,
            currencySymbol: limit.currencyType.symbol,
            transactionLimit: limit.limit ? limit.limit.toFixed(2) : null,
            minimumTransaction: limit.minimumAmount.toFixed(2),
            limitPerDay: limit.limitForUser ? limit.limitForUser.toFixed(2) : null,
          }))
        : [],
  };

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Limites' breadcrumbItem={`Limites para ${props.type === "currencyExchange" ? "Cambios de divisa" : "Avances de efectivo"}`} />
      <Row>
        <Col className='col-12'>
          <Card>
            <CardBody>
              <Table
                isLoading={props.isLoading}
                columns={data.columns}
                rows={data.rows}
                options={{ loadingType: "linear" }}
                actions={[
                  {
                    icon: "edit",
                    iconProps: { style: { color: "#f1b44c" } },
                    tooltip: "Editar usuario",
                    onClick: (e, rowData) => props.edit(rowData),
                  },
                ]}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LimitstTable;
