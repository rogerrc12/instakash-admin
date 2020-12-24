import React from "react";
import { Redirect } from "react-router-dom";

// Pages Component
// import Chat from "../pages/Chat/Chat";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//Pages
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

// LAZY IMPORTS

// Users
const AdminUsers = React.lazy(() => import("../pages/AdminUsers"));
const Clients = React.lazy(() => import("../pages/Clients"));
const ClientDetails = React.lazy(() => import("../pages/Clients/ClientDetails"));
// Transactions modules
const CurrencyExchanges = React.lazy(() => import("../pages/CurrencyExchanges"));
const CashAdvances = React.lazy(() => import("../pages/CashAdvances"));
const TransactionLimits = React.lazy(() => import("../pages/TransactionLimits"));
// System configuration
const CurrencyPrices = React.lazy(() => import("../pages/CurrencyPrices"));
const BankAccounts = React.lazy(() => import("../pages/BankAccounts"));
const Status = React.lazy(() => import("../pages/Status"));
// Settings
const Settings = React.lazy(() => import("../pages/Settings"));
const Banks = React.lazy(() => import("../pages/Banks"));
const Schedule = React.lazy(() => import("../pages/Schedule"));

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // Users
  { path: "/admin-users", component: AdminUsers },
  { path: "/registered-users", component: Clients },
  { path: "/registered-users/:id", component: ClientDetails },
  // Transactions modules
  { path: "/currency-exchanges", component: CurrencyExchanges },
  { path: "/cash-advances", component: CashAdvances },
  { path: "/exchange-transaction-limits", component: TransactionLimits },
  { path: "/advance-transaction-limits", component: TransactionLimits },
  // System configuration
  { path: "/currency-prices", component: CurrencyPrices },
  { path: "/bank-accounts", component: BankAccounts },
  { path: "/status", component: Status },
  // Settings
  { path: "/common-settings", component: Settings },
  { path: "/banks", component: Banks },
  { path: "/schedule", component: Schedule },

  // // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to='/dashboard' /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-forgot-pwd", component: ForgetPwd1 },
  { path: "/auth-lock-screen", component: LockScreen },
];

export { authProtectedRoutes, publicRoutes };
