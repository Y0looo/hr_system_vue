import axios from 'axios'

export const getDept = async () => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/analysis/getDept`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getEducated = async () => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/analysis/getEducated`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getJob = async () => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/analysis/getJob`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getRecords = async () => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/analysis/getRecords`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}