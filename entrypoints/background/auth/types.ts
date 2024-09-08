export interface LoginRes {
  IsSuccess: boolean;
  ResultSet2: any;
  ResultSet1: any;
  ResultSet: ResultSet;
  FilePath: any;
  AuthToken: any;
  Message: any;
  ErrorMessage: any;
  data: any;
  EmpList: any;
  AllowanceList: any;
  DeductionList: any;
  FilterDropdownLists: any;
}

export interface ResultSet {
  CompanyID: string;
  UserID: string;
  CompanyName: string;
  CompanyLogo: string;
  EmployeeProfilePic: string;
  isEnableCheckInOut: string;
  Modules: string;
  Rights: string;
  ScreenTabRights: string;
  User: string;
  ValidTo: string;
  Packageid: string;
  TotalRemainingDays: string;
  IsAdmin: string;
  Currency: string;
  PaymentDueDate: any[];
  Token: string;
  PayrollRegion: string;
  DemoVideo: string;
  MultiKeyword: MultiKeyword[];
  Languageid: number;
  LoanID: number;
  TaxID: number;
  EmployeeID: number;
  IsSuperAdmin: boolean;
  AssignedLocationIds: string;
  DAC: number;
  AssignedCompanyList: string;
  SIT: string;
  SITT: string;
}

export interface MultiKeyword {
  adm_multilingual_mf: any;
  ID: number;
  MultilingualId: number;
  Module: string;
  Form: string;
  Keyword: string;
  Value: string;
  ObjectState: number;
}

export interface Credentials {
  email: string;
  password: string;
}
