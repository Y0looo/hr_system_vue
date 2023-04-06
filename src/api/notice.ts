import axios from 'axios'

export const getAllNotice = async (curPage: number, pageSize: number, name: string) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/notice/getAll?curPage=${curPage}&pageSize=${pageSize}&name=${name}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const getNoticeById = async (id: number) => {
  var config = {
    method: 'get',
    url: `http://localhost:9090/notice/get?id=${id}`,
    headers: { }
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const updateNotice = async (n_id: number, title: string, content: string, publisher: string) => {
  var data = JSON.stringify({
    "n_id": n_id,
    "title": title,
    "content": content,
    "publisher": publisher,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/notice/update',
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

export const deleteNotice = async (id: number) => {
  var data = ''
  var config = {
    method: 'post',
    url: `http://localhost:9090/notice/delete?id=${id}`,
    headers: { },
    data : data
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}

export const addNotice = async(title: string, content: string, publisher: string) => {
  var data = JSON.stringify({
    "title": title,
    "content": content,
    "publisher": publisher,
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:9090/notice/add',
    headers: { 
      'Content-Type': 'application/json;charset=utf-8'
    },
    data : data
  };
  
  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}