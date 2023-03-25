import axios from 'axios'

export const getAllEmploy = async (curPage: number, pageSize: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/employ/getAll?curPage=${curPage}&pageSize=${pageSize}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getEmployById = async (id: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/employ/get?id=${id}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const updateEmploy = async (e_id: number, dept_name: string, job_name: string, number: number, job_work: string, job_require: string) => {
  var data = JSON.stringify({
    "e_id": e_id,
    "dept_name": dept_name,
    "job_name": job_name,
    "number": number,
    "job_work": job_work,
    "job_require": job_require
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/employ/update',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const deleteEmploy = async (id: number) => {
  var data = ''
  var config = {
    method: 'post',
    url: `http://localhost:9090/employ/delete?id=${id}`,
    headers: { },
    data : data
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getEmployByName = async(curPage: number, pageSize: number, name: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/employ/getByName?curPage=${curPage}&pageSize=${pageSize}&name=${name}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const addEmploy = async(dept_name: string, job_name: string, number: number, job_work: string, job_require: string) => {
  var data = JSON.stringify({
    "dept_name": dept_name,
    "job_name": job_name,
    "number": number,
    "job_work": job_work,
    "job_require": job_require
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/employ/add',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}