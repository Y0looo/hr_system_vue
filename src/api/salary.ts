import axios from 'axios'

export const getSelf = async (curPage: number, pageSize: number, s_id: number, startDate: string, endDate: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/salary/getSelf?curPage=${curPage}&pageSize=${pageSize}&s_id=${s_id}&startDate=${startDate}&endDate=${endDate}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getLastSalary = async (s_id: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/salary/getLast?id=${s_id}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getAll = async (curPage: number, pageSize: number, startDate: string, endDate: string, name: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/salary/getAll?curPage=${curPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&name=${name}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getById = async (id: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/salary/getSalaryById?id=${id}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const addSalary = async(s_id: number, time: string, cqts: number, jtts: number, jcgz: number, jxgz: number, jxdj: string, qtjj: number, qtkk: number) => {
  var data = JSON.stringify({
    "s_id": s_id,
    "time": time,
    "cqts": cqts,
    "jtts": jtts,
    "jcgz": jcgz,
    "jxgz": jxgz,
    "jxdj": jxdj,
    "qtjj": qtjj,
    "qtkk": qtkk,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/salary/add',
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
