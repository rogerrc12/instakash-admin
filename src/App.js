import React, { useEffect } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser, getBanks, getCurrencies, getDocumentTypes, createConnection } from "./store/actions";
import history from "./helpers/history";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";
import LazyComponent from "./helpers/lazyComponent";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/custom.scss";

const App = (props) => {
  const { loadUser, getBanks, getCurrencies, getDocumentTypes, createConnection, isLoading } = props;

  useEffect(() => {
    createConnection();
  }, [createConnection]);

  useEffect(() => {
    getBanks();
  }, [getBanks]);

  useEffect(() => {
    getCurrencies();
  }, [getCurrencies]);

  useEffect(() => {
    getDocumentTypes();
  }, [getDocumentTypes]);

  useEffect(() => {
    loadUser(history);
  }, [loadUser]);

  return (
    <Router history={history}>
      <Switch>
        {publicRoutes.map((route, idx) => (
          <AppRoute isLoading={isLoading} path={route.path} layout={NonAuthLayout} component={route.component} key={idx} isAuthProtected={false} />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <AppRoute exact isLoading={isLoading} path={route.path} layout={VerticalLayout} component={LazyComponent(route.component)} key={idx} isAuthProtected={true} />
        ))}
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
    isLoading: state.Login.isLoading,
  };
};

export default connect(mapStateToProps, { loadUser, getBanks, getCurrencies, getDocumentTypes, createConnection })(App);
