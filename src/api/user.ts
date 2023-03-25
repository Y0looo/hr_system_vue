import axios from 'axios'

export const login = async (account: string, pwd: string) => {
  var data = JSON.stringify({
    "account": account,
    "pwd": pwd
  });

  var config = {
    method: 'post',
    url: 'http://localhost:9090/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    return await axios(config).then(res => res.data)
  } catch(error: any) {
    return error
  }
}
