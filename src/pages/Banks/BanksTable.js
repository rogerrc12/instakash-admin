import React from "react";
import { Card, CardBody } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/UI/Table";

const BanksList = (props) => {
  const data = {
    columns: [
      {
        field: "bankName",
        title: "Nombre del banco",
      },
      {
        field: "createAccount",
        title: "Para cuentas",
        render: (rowData) => <span className={`fa-lg ${rowData.createAccount ? "fas fa-check-circle text-success" : "fas fa-times-circle text-danger"}`} />,
      },
      {
        field: "paymentOption",
        title: "Para pagos",
        render: (rowData) => <span className={`fa-lg ${rowData.paymentOption ? "fas fa-check-circle text-success" : "fas fa-times-circle text-danger"}`} />,
      },
      {
        field: "icon",
        title: "Icono",
        render: (rowData) => <img height={25} src={`data:image/png;base64, ${rowData.icon}`} alt={rowData.bankName} />,
      },
    ],
    rows:
      props.data.length > 0
        ? props.data.map((bank) => ({
            id: bank.idBank,
            bankName: bank.name,
            createAccount: bank.isAccount,
            paymentOption: bank.ispayments,
            icon: bank.image,
          }))
        : [],
  };

  return (
    <>
      <Breadcrumbs title='Bancos' breadcrumbItem='Bancos aceptados' />
      <Card>
        <CardBody>
          <Table
            columns={data.columns}
            rows={data.rows}
            isLoading={props.isLoading}
            options={{ loadingType: "linear", paging: false }}
            actions={[
              {
                icon: "edit",
                iconProps: { style: { color: "#f1b44c" } },
                tooltip: "Editar usuario",
                onClick: (e, rowData) => props.edit(rowData),
              },
              {
                icon: "delete",
                iconProps: { style: { color: "#f46a6a" } },
                tooltip: "Eliminar usuario",
                onClick: (e, rowData) => props.delete(rowData.id),
              },
            ]}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default BanksList;
