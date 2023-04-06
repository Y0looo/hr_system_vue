import axios from 'axios'

export const getMonthReward = async (s_id: number, time: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/record/getReward?s_id=${s_id}&time=${time}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getMonthPunish = async (s_id: number, time: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/record/getPunish?s_id=${s_id}&time=${time}`,
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
    url: `http://localhost:9090/record/getAll?curPage=${curPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&name=${name}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getSelf = async (curPage: number, pageSize: number, s_id: number, startDate: string, endDate: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/record/getSelf?curPage=${curPage}&pageSize=${pageSize}&s_id=${s_id}&startDate=${startDate}&endDate=${endDate}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const addRecord = async(s_id: number, type: number, money: number, content: string, time: string) => {
  var data = JSON.stringify({
    "s_id": s_id,
    "type": type,
    "money": money,
    "content": content,
    "time": time,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/record/add',
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

export const deleteRecord = async (id: number) => {
  var data = ''
  var config = {
    method: 'post',
    url: `http://localhost:9090/record/delete?id=${id}`,
    headers: { },
    data : data
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const updateRecord = async (id: number, time: string, money: number, content: string) => {
  var data = JSON.stringify({
    "id": id,
    "time": time,
    "money": money,
    "content": content,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/record/update',
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

export const getById = async (id: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/record/getById?id=${id}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}