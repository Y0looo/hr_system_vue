import axios from 'axios'

export const getAllDept = async (curPage: number, pageSize: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/dept/getAllDept?curPage=${curPage}&pageSize=${pageSize}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getDeptById = async (id: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/dept/getDept?id=${id}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const updateDept = async (d_id: number, dept_name: string, dept_introduce: string) => {
  var data = JSON.stringify({
    "d_id": d_id,
    "dept_name": dept_name,
    "dept_introduce": dept_introduce,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/dept/updateDept',
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

export const deleteDept = async (id: number) => {
  var data = ''
  var config = {
    method: 'post',
    url: `http://localhost:9090/dept/deleteDept?id=${id}`,
    headers: { },
    data : data
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getDeptByName = async(curPage: number, pageSize: number, name: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/dept/getByName?curPage=${curPage}&pageSize=${pageSize}&name=${name}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const addDept = async(dept_name: string, dept_introduce: string) => {
  var data = JSON.stringify({
    "dept_name": dept_name,
    "dept_introduce": dept_introduce,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/dept/addDept',
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

export const getDeptsList = async () => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/dept/getDepts`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}