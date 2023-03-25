import axios from 'axios'

export const getAllJob = async (curPage: number, pageSize: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/job/getAll?curPage=${curPage}&pageSize=${pageSize}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getJobById = async (id: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/job/get?id=${id}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const updateJob = async (job_id: number, dept_name: string, job_name: string) => {
  var data = JSON.stringify({
    "job_id": job_id,
    "dept_name": dept_name,
    "job_name": job_name,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/job/update',
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

export const deleteJob = async (id: number) => {
  var data = ''
  var config = {
    method: 'post',
    url: `http://localhost:9090/job/delete?id=${id}`,
    headers: { },
    data : data
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getJobByName = async(curPage: number, pageSize: number, name: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/job/getByName?curPage=${curPage}&pageSize=${pageSize}&name=${name}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const addJob = async(job_name: string, dept_name: string) => {
  var data = JSON.stringify({
    "job_name": job_name,
    "dept_name": dept_name,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/job/add',
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

export const getJobsList = async() => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/job/getJobs`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}