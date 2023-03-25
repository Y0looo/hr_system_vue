import axios from 'axios'

export const getAllStaff = async (curPage: number, pageSize: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/staff/getAll?curPage=${curPage}&pageSize=${pageSize}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getStaffById = async (id: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/staff/get?id=${id}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const updateStaff = async (s_id: number, phone: string, code: string, age: number,
  address: string, d_id: number, job_id: number, educated: string) => {
  var data = JSON.stringify({
    "s_id": s_id,
    "phone": phone,
    "code": code,
    "age": age,
    "address": address,
    "d_id": d_id,
    "job_id": job_id,
    "educated": educated
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/staff/update',
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

export const deleteStaff = async (id: number) => {
  var data = ''
  var config = {
    method: 'post',
    url: `http://localhost:9090/staff/delete?id=${id}`,
    headers: { },
    data : data
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getStaffByName = async(curPage: number, pageSize: number, name: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/staff/getByName?curPage=${curPage}&pageSize=${pageSize}&name=${name}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const addStaff = async(name: string, account: string, pwd: string, phone: string, role: string) => {
  var data = JSON.stringify({
    "name": name,
    "account": account,
    "pwd": pwd,
    "phone": phone,
    "role": role,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/staff/add',
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


export const updateStaffByAdmin = async (s_id: number, pwd: string, phone: string, code: string, age: number,
  address: string, d_id: number, job_id: number, educated: string) => {
  var data = JSON.stringify({
    "s_id": s_id,
    "pwd": pwd,
    "phone": phone,
    "code": code,
    "age": age,
    "address": address,
    "d_id": d_id,
    "job_id": job_id,
    "educated": educated
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/staff/updateByAdmin',
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