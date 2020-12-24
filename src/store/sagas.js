import { all } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import LayoutSaga from "./layout/saga";
import BanksSaga from "./settings/banks/saga";
import DocumentTypesSaga from "./settings/documentTypes/saga";
import HubConnectionSaga from "./hubConnection/saga";

// private
import AdminUsersSaga from "./settings/users/saga";
import SetttingsSaga from "./settings/basicSettings/saga";
import CurrencyExchangeSaga from "./transactions/currencyExchange/saga";
import CashAdvanceSaga from "./transactions/cashAdvance/saga";
import BinnacleSaga from "./activity/binnacle/saga";
import CurrencyPricesSaga from "./settings/currencyPrices/saga";
import LimitsSaga from "./transactions/limits/saga";
import BankAccountsSaga from "./settings/bankAccounts/saga";
import CurrenciesSaga from "./settings/currencies/saga";
import ClientsSaga from "./settings/clients/saga";
import StatusSaga from "./settings/status/saga";
import CountersSaga from "./activity/counters/saga";
import NotificationsSaga from "./settings/notifications/saga";
import ScheduleSaga from "./settings/schedule/saga";
import ChartsSaga from "./charts/saga";

export default function* rootSaga() {
  yield all([
    //public
    AuthSaga(),
    HubConnectionSaga(),
    //private
    AccountSaga(),
    AdminUsersSaga(),
    SetttingsSaga(),
    BanksSaga(),
    NotificationsSaga(),
    LayoutSaga(),
    CurrencyExchangeSaga(),
    CashAdvanceSaga(),
    BinnacleSaga(),
    CurrencyPricesSaga(),
    LimitsSaga(),
    BankAccountsSaga(),
    CurrenciesSaga(),
    ClientsSaga(),
    DocumentTypesSaga(),
    StatusSaga(),
    CountersSaga(),
    ScheduleSaga(),
    ChartsSaga(),
  ]);
}
