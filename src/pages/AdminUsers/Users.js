import React from "react";
import { Card, CardBody } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/UI/Table";

const Users = (props) => {
  const data = {
    columns: [
      {
        title: "Nombre completo",
        field: "userName",
        cellStyle: { border: "1px solid #32394e", borderLeft: "none" },
        headerStyle: { borderLeft: "none" },
      },
      {
        title: "Correo de acceso",
        field: "userEmail",
        cellStyle: { border: "1px solid #32394e" },
      },
      {
        title: "Rol de usuario",
        field: "userRole",
        cellStyle: { border: "1px solid #32394e" },
      },
    ],
    rows: [],
  };

  if (props.users.length > 0) {
    data.rows = props.users.map((user) => ({
      userId: user.id,
      userName: user.userName,
      userEmail: user.email,
      userRole: user.adminRole.name,
      roleId: user.idRol,
    }));
  }

  return (
    <>
      <Breadcrumbs title='Usuario Administrativos' breadcrumbItem='Usuarios Administrativos' />
      <Card>
        <CardBody>
          <Table
            columns={data.columns}
            rows={data.rows}
            actions={[
              {
                icon: "edit",
                iconProps: { style: { color: "#f1b44c" } },
                tooltip: "Editar usuario",
                onClick: (e, rowData) => props.toggleModal(rowData),
              },
              {
                icon: "delete",
                iconProps: { style: { color: "#f46a6a" } },
                tooltip: "Eliminar usuario",
                onClick: (e, rowData) => props.delete(rowData.userId),
              },
              {
                icon: "add",
                iconProps: { style: { color: "#fff" } },
                tooltip: "Agregar usuario",
                onClick: (e, rowData) => props.toggleModal(),
                isFreeAction: true,
              },
            ]}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(Users);
