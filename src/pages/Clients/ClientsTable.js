import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { clientInstance as axios } from "../../helpers/AuthType/axios";
import moment from "moment";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/UI/Table";

const UsersTable = (props) => {
  const data = {
    columns: [
      {
        field: "userName",
        title: "Nombre",
      },
      {
        field: "email",
        title: "Correo",
      },
      {
        field: "document",
        title: "Documento",
        render: (rowData) => (
          <p>
            {rowData.documentType} <br /> {rowData.document}
          </p>
        ),
      },
      {
        field: "phone",
        title: "Teléfono",
      },
      {
        field: "date",
        title: "Fecha registrado",
      },
      {
        field: "status",
        title: "Estado",
        render: (rowData) => <span className={rowData.status ? "text-warning" : "text-success"}>{rowData.status ? "NO ACTIVO" : "ACTIVO"}</span>,
      },
      {
        title: "Acción",
        field: "action",
        width: 150,
        render: (rowData) => (
          <Link to={props.match.path + "/" + rowData.idUser} className='btn-rounded waves-effect waves-light btn btn-blue btn-sm font-size-13'>
            Cliente
          </Link>
        ),
      },
    ],
    rows: (query) =>
      new Promise((resolve, reject) => {
        const url = `/Cliente/ObtenerClientes?Pag=${query.page + 1}&Cant=${query.pageSize}&Filtro=${query.search}`;
        axios
          .get(url)
          .then((result) => {
            const data = result.data.clientes.map((client) => ({
              idUser: client.id,
              userName: client.firstName + " " + client.lastName,
              email: client.email,
              documentType: client.lbDocumentsTypes.docTypeDes,
              document: client.dniNumber,
              phone: client.phoneNumber,
              date: moment(client.registerDate).format("DD/MM/YYYY hh:mm a"),
              status: client.isDisabled,
            }));

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
      <Breadcrumbs title='Usuarios' breadcrumbItem='Usuarios registrados' />

      <Row>
        <Col className='col-12'>
          <Card>
            <CardBody>
              <Table
                columns={data.columns}
                rows={data.rows}
                options={{ loadingType: "linear", exportButton: true, exportAllData: true, pageSize: 25, pageSizeOptions: [25, 50, 100] }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(UsersTable);
