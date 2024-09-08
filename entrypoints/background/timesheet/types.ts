export interface TimeSheetDetail {
  ID: number;
  TimeSheetMfID: number;
  CompanyID: number;
  ProjectID: number;
  ProjectDropdownID: number;
  DisplayProjectName: string;
  EmplyeeSalaryTypeID: number | null;
  TrackDate: string;
  TrackTimeIn: string;
  TrackTimeOut: string;
  TrackTimeIn1: string | null;
  TrackTimeOut1: string | null;
  Notes: string;
  EmployeeID: number;
  WorkedHour: string | null;
  Status: number;
  ProjectWorkedHours: string;
  HourlyRate: number;
  DetailEntry: boolean;
  TotalAmount: number;
  CreatedBy: number;
  CreatedDate: string;
  ModifiedBy: number | null;
  ModifiedDate: string | null;
  pr_time_sheet_mf: any | null; // Adjust type based on expected structure
  sys_drop_down_value: any | null; // Adjust type based on expected structure
  DropDownProjectList: any[]; // Adjust type based on expected structure
  ObjectState: number;
}

export interface EmployeeTimeSheet {
  TimeSheetMfID: number;
  MonthDate: string;
  AttendanceDate: string;
  EmployeeID: number;
  EmployeeName: string | null;
  WorkedHours: string;
  IsWeekend: string;
  TimeIn: string;
  TimeOut: string;
  WeekDayHRSalary: number;
  WeekEndHRSalary: number;
  PublicHRSalary: number;
  HourlyRate: number;
  TotalAmount: number;
  TempTotalWokedHours: string | null;
  Status: string | null;
  pr_time_sheet_dt: TimeSheetDetail[];
}

interface ResultSet {
  EmployeeTimeSheetInnerMasterList: EmployeeTimeSheet[];
}

export interface TimesheetRes {
  IsSuccess: boolean;
  ResultSet2: any | null; // Adjust type based on expected structure
  ResultSet1: any | null; // Adjust type based on expected structure
  ResultSet: ResultSet | null;
  FilePath: string | null;
  AuthToken: string | null;
  Message: string | null;
  ErrorMessage: string | null;
  data: any | null; // Adjust type based on expected structure
  EmpList: any | null; // Adjust type based on expected structure
  AllowanceList: any | null; // Adjust type based on expected structure
  DeductionList: any | null; // Adjust type based on expected structure
  FilterDropdownLists: any | null; // Adjust type based on expected structure
}

export interface Project {
  id: number;
  name: string;
}

export interface ProjectSearchRes {
  IsSuccess: boolean;
  ResultSet2: any[] | null;
  ResultSet1: any[] | null;
  ResultSet: Array<{
    ID: number;
    Value: string;
  }> | null;
  FilePath: string | null;
  AuthToken: string | null;
  Message: string | null;
  ErrorMessage: string | null;
  data: any | null;
  EmpList: any[] | null;
  AllowanceList: any[] | null;
  DeductionList: any[] | null;
  FilterDropdownLists: any[] | null;
}
