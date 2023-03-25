import axios from 'axios'

export const getSelf = async (curPage: number, pageSize: number, s_id: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/attend/getSelf?curPage=${curPage}&pageSize=${pageSize}&s_id=${s_id}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const workArrive = async (s_id: number, date: string) => {
  var data = JSON.stringify({
    "s_id": s_id,
    "date": date,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/attend/arrive',
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

export const workLeave = async (s_id: number, date: string) => {
  var data = JSON.stringify({
    "s_id": s_id,
    "date": date,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/attend/leave',
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

export const getSelfByTime = async (curPage: number, pageSize: number, startDate: string, endDate: string, s_id: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/attend/getSelfByTime?curPage=${curPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&s_id=${s_id}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getAll = async (curPage: number, pageSize: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/attend/getAll?curPage=${curPage}&pageSize=${pageSize}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getAllByTime = async (curPage: number, pageSize: number, startDate: string, endDate: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/attend/getAllByTime?curPage=${curPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getAllByName = async (curPage: number, pageSize: number, name: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/attend/getAllByName?curPage=${curPage}&pageSize=${pageSize}&name=${name}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}