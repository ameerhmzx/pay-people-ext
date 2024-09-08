export interface DashboardRes {
  IsSuccess: boolean;
  ResultSet2: any | null;
  ResultSet1: any | null;
  ResultSet: ResultSet | null;
  FilePath: string | null;
  AuthToken: string | null;
  Message: string | null;
  ErrorMessage: string | null;
  data: any | null;
  EmpList: any | null;
  AllowanceList: any | null;
  DeductionList: any | null;
  FilterDropdownLists: any | null;
}

interface ResultSet {
  DemoVideo: string;
  EventList: any[];
  TotalEvents: number;
  HolidayList: any[];
  TotalHolidays: number;
  LeaveList: any[];
  DOBList: any[];
  AnniverseryList: any[];
  ExitList: any[];
  LastEventList: any[];
  LastTotalEvents: number;
  LastDOBList: any[];
  LastAnniverseryList: any[];
  PendingTasksList: any[];
  PendingLeavesList: any[];
  PendingLoansList: any[];
  PendingExpenseList: any[];
  PendingAttendanceRegulation: any[];
  PendingGoalsList: any[];
  PendingAppraisalReviewList: any[];
  PendingEmployeeActionRequestList: any[];
  PendingDocumentRequestList: any[];
  ShowRemoveSampeDataButton: boolean;
  CompletedStepsList: CompletedStep[];
  IsNewSignup: boolean;
  adm_user_company: AdmUserCompany;
  CheckInCheckOutTimeModel: CheckInCheckOutTimeModel;
}

interface CompletedStep {
  adm_company: any | null;
  ID: number;
  CompanyID: number;
  AutomationStep: number;
  IsClick: boolean;
  CreatedBy: number;
  CreatedDate: string;
  ModifiedBy: number;
  ModifiedDate: string;
  ObjectState: number;
}

interface AdmUserCompany {
  adm_company: any[];
  adm_company1: any[];
  adm_super_company: any[];
  adm_super_company_licence_log: any[];
  adm_super_company1: any[];
  adm_user_assigned_company: AdmUserAssignedCompany[];
  adm_user_assigned_location: any[];
  adm_user_company: AdmUserAssignedCompany[];
  adm_user_company1: any[];
  adm_user_register_devices: any[];
  adm_user_token: any[];
  CandidateNoteCreatedBy: any[];
  ExitEntryVisaActionTaker: any[];
  FinalExitVisaActionTaker: any[];
  IqamaActionTaker: any[];
  IqamaIssueActionTaker: any[];
  JobNoteCreatedBy: any[];
  lms_course_user_discussion: any[];
  MassCreatedBy: any[];
  MuqeemPassportActionTaker: any[];
  pr_assets_assignee: any[];
  pr_assets_history: any[];
  pr_employee_Action_mf: any[];
  pr_overtime_policies_mf: any[];
  pr_target_duration_history: any[];
  pr_time_entry_device: any[];
  pr_time_entry_device1: any[];
  rc_candidate_rating: any[];
  RemarksCreatedBy: any[];
  ID: number;
  Email: string;
  Pwd: string;
  CurrentPassword: string | null;
  Name: string;
  PhoneNo: string | null;
  AccountType: string;
  CultureID: number;
  AccountStatus: string | null;
  LoginFailureNo: number;
  UserLock: boolean;
  isActivated: boolean;
  ActivationToken: string | null;
  ActivationTokenDate: string | null;
  ActivatedDate: string | null;
  LastSignIn: string;
  ForgotToken: string | null;
  ForgotTokenDate: string | null;
  PhoneNotification: boolean;
  EmailNotification: boolean;
  IsDeleted: boolean;
  MultilingualId: number;
  CompanyName: string | null;
  LocationIds: string | null;
  CompanyIds: string | null;
  PMSRights: any | null;
  RCRights: any | null;
  LMSRights: any | null;
  STRights: any | null;
  RNRights: any | null;
  EmployeeID: number;
  IsAdmin: any | null;
  BrowserInfo: string | null;
  MFAOTP: string | null;
  MFAOTPDate: string | null;
  IsMobileBlockingAllow: any | null;
  ObjectState: number;
}

interface AdmUserAssignedCompany {
  adm_company: any | null;
  adm_role_mf: any | null;
  adm_user1: any | null;
  pr_employee_mf: any | null;
  ID: number;
  UserID: number;
  CompanyID: number;
  EmployeeID: number;
  RoleID: number;
  AdminID: number;
  IsDefault: boolean;
  IsWorkProcessor: boolean;
  ReportingHierarchyID: number;
  ObjectState: number;
}

interface CheckInCheckOutTimeModel {
  TimeEntryMfID: number;
  BreakEntryMfID: number;
  ShiftIn: number;
  IsCheckIn: boolean;
  IsBreakIn: boolean;
  TotalworkingTime: string;
  ShiftStartTime: string;
  ShiftEndTime: string;
  CheckInTime: string;
  CheckOutTime: string | null;
}
