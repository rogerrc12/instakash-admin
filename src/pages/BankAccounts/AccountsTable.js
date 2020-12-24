import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/UI/Table";

const AccountsTable = (props) => {
  const data = {
    columns: [
      {
        title: "Banco",
        field: "bankName",
      },
      {
        title: "Moneda",
        field: "currency",
      },
      {
        title: "Nro. de cuenta",
        field: "accNumber",
      },
      {
        title: "Saldo",
        field: "balance",
      },
    ],
    rows:
      props.accounts.length > 0
        ? props.accounts.map((account) => ({
            accountId: account.id,
            bankName: account.nombreBanco,
            bankImg: account.imagenBanco,
            bankId: account.idBanco,
            currencyId: account.idmoneda,
            currency: account.moneda,
            accNumber: account.numeroCuenta,
            balanceNumber: account.saldo,
            balance: account.simboloMoneda + " " + account.saldo.toFixed(2),
          }))
        : [],
  };

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Cuentas' breadcrumbItem='Cuentas bancarias de Instakash' />

      <Row>
        <Col className='col-12'>
          <Card>
            <CardBody>
              <Table
                rows={data.rows}
                columns={data.columns}
                isLoading={props.isLoading}
                actions={[
                  {
                    icon: "edit",
                    iconProps: { style: { color: "#f1b44c" } },
                    tooltip: "Editar cuenta",
                    onClick: (e, rowData) => props.edit(rowData),
                  },
                  {
                    icon: "add",
                    iconProps: { style: { color: "#fff" } },
                    tooltip: "Agregar cuenta",
                    onClick: (e, rowData) => props.add(),
                    isFreeAction: true,
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

export default React.memo(AccountsTable);
