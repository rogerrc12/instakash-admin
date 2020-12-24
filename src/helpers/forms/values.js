import moment from "moment";

export const registerAdminValues = (values) => ({
  UserName: (values && values.userName) || "",
  Email: (values && values.userEmail) || "",
  Password: "",
  ConfirmPassword: "",
  IdRol: (values && values.roleId) || "",
});

export const landingSettingsValues = (values) => ({
  contUsers: values ? values.contUsers : "",
  contOps: values ? values.contOps : "",
  contSolesTransfer: values ? values.contSolesTransfer : "",
  showRealStadistic: values ? values.showRealStadistic : false,
});

export const transactionSettingsValues = (values) => ({
  merchantComment: values ? values.merchantComment : "",
  minutesToCancelOp: values ? values.minutesToCancelOp : "",
  timeToResponse: values ? values.timeToResponse : "",
});

export const editCurrencyExchangeValues = {
  idBankSend: "",
  idBankReceive: "",
  accountNumber: "",
  accountType: "",
  transferNumber: "",
  isPreferential: false,
  amountSell: "",
  amountReceive: "",
  preferentialRate: "",
};

export const currencyPriceValues = (toBuy, toSell) => ({
  toBuy1: +toBuy[0] || 0,
  toBuy2: +toBuy[2] || 0,
  toBuy3: +toBuy[3] || 0,
  toBuy4: +toBuy[4] || 0,
  toSell1: +toSell[0] || 0,
  toSell2: +toSell[2] || 0,
  toSell3: +toSell[3] || 0,
  toSell4: +toSell[4] || 0,
});

export const bankValues = (values) => ({
  name: (values && values.bankName) || "",
  minNumbers: "",
  maxNumbers: "",
  isInterbank: false,
  addAccount: (values && values.createAccount) || false,
  paymentOption: (values && values.paymentOption) || false,
  bankImage: null,
  imagePreview: (values && values.icon) || null,
});

export const limitsValues = (values) => ({
  idCurrency: values.idCurrency || "",
  transactionLimit: +values.transactionLimit || "",
  transactionMinimum: +values.minimumTransaction || "",
  limitPerDay: +values.limitPerDay || "",
});

export const CbAccountValues = (values) => ({
  accNumber: values ? values.accNumber : "",
  balance: values ? values.balanceNumber : "",
  idBank: values ? values.bankId : "",
  idCurrencyType: values ? values.currencyId : "",
});

export const editClientValues = (values) => ({
  firstName: values && values.firstName ? values.firstName : "",
  lastName: values && values.lastName ? values.lastName : "",
  email: values && values.email ? values.email : "",
  phoneNumber: values && values.phoneNumber ? values.phoneNumber : "",
  idDocumentType: values && values.idDocumentType ? values.idDocumentType : "",
  dniNumber: values && values.dniNumber ? values.dniNumber : "",
  dateBirth: values && values.dateBirth ? moment(values.dateBirth).format("YYYY-MM-DD") : "",
  address: values && values.address ? values.address : "",
  occupation: values && values.occupation ? values.occupation : "",
  profession: values && values.profession ? values.profession : "",
  RUCNumber: values && values.rucNumber ? values.rucNumber : "",
  CompanyName: values && values.companyName ? values.companyName : "",
  isDisabled: values ? values.isDisabled : "",
});

export const statusValues = (values) => ({
  description: values ? values.description : "",
  hexaColor: values ? values.color : "",
});

export const scheduleValues = (values) => ({
  IdSchedule: values.idSchedule,
  IdWeekday: values.idDayOfWeek,
  StartTime: values.startTime || "",
  EndTime: values.endTime || "",
  IsWorkingDay: values.isWorkday,
});
