import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";
import HubConnection from "./hubConnection/reducer";

// Settings
import AdminUsers from "./settings/users/reducer";
import Settings from "./settings/basicSettings/reducer";
import Banks from "./settings/banks/reducer";
import DocumentTypes from "./settings/documentTypes/reducer";
import CurrencyPrices from "./settings/currencyPrices/reducer";
import BankAccounts from "./settings/bankAccounts/reducer";
import Currencies from "./settings/currencies/reducer";
import Clients from "./settings/clients/reducer";
import Status from "./settings/status/reducer";
import Notifications from "./settings/notifications/reducer";
import Schedule from "./settings/schedule/reducer";

// Activity
import Binnacle from "./activity/binnacle/reducer";
import Counters from "./activity/counters/reducer";

// Transactions
import CurrencyExchange from "./transactions/currencyExchange/reducer";
import CashAdvance from "./transactions/cashAdvance/reducer";
import Limits from "./transactions/limits/reducer";
import Charts from "./charts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  HubConnection,
  // private
  Account,
  AdminUsers,
  Settings,
  Notifications,
  Banks,
  DocumentTypes,
  CurrencyExchange,
  CashAdvance,
  Binnacle,
  CurrencyPrices,
  Limits,
  BankAccounts,
  Currencies,
  Clients,
  Status,
  Counters,
  Schedule,
  Charts,
});

export default rootReducer;
