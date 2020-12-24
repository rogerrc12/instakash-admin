import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, Button, UncontrolledAlert as Alert } from "reactstrap";
import { connect } from "react-redux";
import { getUsers, addUser, editUser, deleteUser, getRoles } from "../../store/settings/users/actions";
import { Route } from "react-router-dom";

import Users from "./Users";
import UserForm from "./UserForm";

const AdminUsers = (props) => {
  const { getUsers, getRoles, users, roles, addUser, editUser, deleteUser } = props;
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const toggleModal = (user) => {
    setUserData(user || null);
    setModal((prevState) => !prevState);
  };

  return (
    <>
      <div className='page-content'>
        <Container fluid>
          <Row>
            <Col lg='12'>
              <Route
                exact
                path={props.match.url}
                render={(props) => <Users {...props} users={users} delete={deleteUser} toggleModal={toggleModal} />}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Modal isOpen={modal} role='dialog' autoFocus={true} centered={true} className='exampleModal' tabIndex='-1' toggle={toggleModal}>
        <div className='modal-content'>
          <ModalHeader toggle={toggleModal}>Formulario de usuario</ModalHeader>
          <ModalBody>
            {props.error && props.error ? <Alert color='danger'>{props.error}</Alert> : null}
            {props.success && props.success ? <Alert color='success'>{props.success}</Alert> : null}
            <UserForm roles={roles} userData={userData} add={addUser} edit={editUser} toggleModal={toggleModal} />
          </ModalBody>
          <ModalFooter>
            <Button type='button' color='secondary' onClick={toggleModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  const { users, roles, error, success } = state.AdminUsers;
  return { users, error, success, roles };
};

export default connect(mapStateToProps, { getUsers, addUser, editUser, deleteUser, getRoles })(AdminUsers);
