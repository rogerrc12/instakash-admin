import React from "react";
import { Card, CardBody } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/UI/Table";

const StatusTable = (props) => {
  const data = {
    columns: [
      {
        field: "description",
        title: "Nombre",
      },
      {
        field: "color",
        title: "Color",
        render: (rowData) => <span className='status-color' style={{ backgroundColor: rowData.color }} />,
      },
    ],
    rows:
      props.data.length > 0
        ? props.data.map((status) => ({
            id: status.idTransactionState,
            description: status.description,
            color: status.hexaColor,
          }))
        : [],
  };

  return (
    <>
      <Breadcrumbs title='status' breadcrumbItem='Estados transacciones' />
      <Card>
        <CardBody>
          <Table
            columns={data.columns}
            rows={data.rows}
            actions={[
              {
                icon: "edit",
                iconProps: { style: { color: "#f1b44c" } },
                tooltip: "Editar estado",
                onClick: (e, rowData) => props.setEdit(rowData),
              },
            ]}
            options={{ paging: false }}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default StatusTable;
