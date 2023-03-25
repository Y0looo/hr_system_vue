export enum RESPONSE_CODE {
  OK = 200,
  FAIL = 201,
  USEREXIST = 202,
  DEPT = 203,
  JOB = 204,
  ATTEND = 205,
  SALARY = 207,
}

export type Response<T> = {
  code: number,
  message: string,
  data: T
  ok: boolean
}

export type UserModel = {
  s_id: number,
  account: string,
  pwd: string,
  name: string,
  code: string,
  phone: string,
  address: string,
  educated: string,
  age: string,
  role: string,
  d_id: number,
  dept_name: string,
  job_id: number,
  job_name: string,
  create_time: string,
}

export type UserList = {
  count: number,
  staff: UserModel[],
}

export type Dept = {
  d_id: number,
  dept_name: string,
  dept_introduce: string,
  create_time: string,
}

export type DeptList = {
  count: number,
  dept: Dept[]
}

export type Job = {
  job_id: number,
  job_name: string,
  d_id: number,
  dept_name: string,
  create_time: string
}

export type JobList = {
  count: number,
  job: Job[]
}

export type Employ = {
  e_id: number,
  job_name: string,
  d_id: number,
  dept_name: string,
  number: number,
  job_require: string,
  job_work: string
}

export type EmployList = {
  count: number,
  employ: Employ[]
}

export type Notice = {
  n_id: number,
  title: string,
  content: string,
  publisher: string,
  create_time: string,
  update_time: string
}

export type NoticeList = {
  count: number,
  notice: Notice[]
}

export type Attend = {
  id: number,
  s_id: number,
  date: string,
  arrive_time: string,
  leave_time: string,
  attend_status: string,
  name: string
}

export type AttendList = {
  count: number,
  attend: Attend[]
}

export type Salary = {
  id: number,
  s_id: number,
  name: string,
  dept_name: string,
  job_name: string,
  time: string,
  month: string,
  year: string,
  cqts: number,
  jtts: number,
  jcgz: number,
  jxgz: number,
  jxdj: string,
  qtjj: number,
  qtkk: number,
  sbkk: number,
  gjjkk: number,
  yksj: number,
  real_salary: number
}

export type SalaryList = {
  count: number,
  salary: Salary[]
}

export type Record = {
  id: number,
  s_id: number,
  name: string,
  type: string,
  money: number,
  content: string,
  time: string,
  // month: string,
  // year: string,
  // create_time: string,
  // delete_time: string,
  // status: number
}

export type Depart = {
  d_id: number,
  dept_name: string
}

export type RecordList = {
  count: number,
  record: Record[]
}

export type DepartList = {
  dept: Depart[],
}

export type JobInfo = {
  job_id: number,
  job_name: string
}

export type JobInfoList = {
  job: JobInfo[],
}