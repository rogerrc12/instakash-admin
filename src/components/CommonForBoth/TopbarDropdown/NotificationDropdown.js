import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import moment from "moment-timezone";

//i18n
import { withNamespaces } from "react-i18next";

const NotificationDropdown = (props) => {
  const { notifications: notificationsObj, connection, user } = props;
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState(null);
  const toggle = () => setMenu((prevState) => !prevState);

  useEffect(() => {
    if (notificationsObj) setNotifications(notificationsObj);
  }, [notificationsObj]);

  let role = null;
  if (user) role = user.idRol;

  let totalCount;
  if (notifications && (notifications.cambioDivisa || notifications.avanceEfectivo)) {
    totalCount = notifications.cambioDivisa.total + notifications.avanceEfectivo.total;
  }

  useEffect(() => {
    if (!role) return () => {};

    if (connection) {
      let connectionString = role === 3 ? "NotificacionesAna" : role === 2 ? "NotificacionesOp" : "NotificacionesAdmin";
      connection.on(connectionString, (response) => {
        console.log("Escuchando en notificaciones!");
        setNotifications(response);
      });
    }
  }, [connection, role]);

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className='dropdown d-inline-block' tag='li'>
        <DropdownToggle className='btn header-item noti-icon waves-effect' tag='button' id='page-header-notifications-dropdown'>
          <i className={`bx bx-bell ${totalCount > 0 ? "bx-tada" : ""}`}></i>
          {totalCount && <span className='badge badge-danger badge-pill'>{totalCount}</span>}
        </DropdownToggle>

        <DropdownMenu className='dropdown-menu dropdown-menu-lg p-0' right>
          <div className='p-3'>
            <Row className='align-items-center'>
              <Col>
                <h6 className='m-0'> {props.t("Notificaciones")} </h6>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "130px" }}>
            <Link to='currency-exchanges' className='text-reset notification-item'>
              {notifications && notifications.cambioDivisa ? (
                <div className='media'>
                  <div className='media-body'>
                    <h6 className='mt-0 mb-1'>
                      {props.t(`Hay ${notifications.cambioDivisa.total} cambios de divisa ${role === 3 ? "por validar" : role === 2 ? "por procesar" : "pendiente"}`)}
                    </h6>
                    <div className='font-size-12 text-muted'>
                      <p className='mb-0'>
                        <i className='mdi mdi-clock-outline'></i> último {moment(notifications.cambioDivisa.fecha).startOf("hour").fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='media'>
                  <div className='media-body'>
                    <h6 className='mt-0 mb-1'>No hay ningún cambio de divisa nuevo</h6>
                    <div className='font-size-12 text-muted'>
                      <p className='mb-0'>
                        <i className='mdi mdi-clock-outline'></i>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Link>
            <Link to='cash-advances' className='text-reset notification-item'>
              {notifications && notifications.avanceEfectivo ? (
                <div className='media'>
                  <div className='media-body'>
                    <h6 className='mt-0 mb-1'>
                      {props.t(`Hay ${notifications.avanceEfectivo.total} avances de efectivo ${role === 3 ? "por validar" : role === 2 ? "por procesar" : "pendientes"}`)}
                    </h6>
                    <div className='font-size-12 text-muted'>
                      <p className='mb-0'>
                        <i className='mdi mdi-clock-outline'></i> último {moment(notifications.avanceEfectivo.fecha).startOf("hour").fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='media'>
                  <div className='media-body'>
                    <h6 className='mt-0 mb-1'>No hay ningún avance de efectivo nuevo</h6>
                    <div className='font-size-12 text-muted'>
                      <p className='mb-0'>
                        <i className='mdi mdi-clock-outline'></i>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </SimpleBar>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};
export default withNamespaces()(NotificationDropdown);
