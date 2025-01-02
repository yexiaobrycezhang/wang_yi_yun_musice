import axios from 'axios'
import { showNotify } from 'vant'

const instance = axios.create()

// instance.defaults.baseURL = 'http://localhost:3000'

instance.defaults.timeout = 60000

export default instance

instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      if (response.data.code === 200) {
        return Promise.resolve(response.data)
      } else {
        return Promise.reject(response.data)
      }
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

export const getRequest = async function (url, data) {
  url = '/music/' + url
  return await instance({
    url: url,
    method: 'get',
    params: data
  })
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error)
      showNotify({
        message: error.message,
        position: 'bottom',
        type: 'danger'
      })
    })
}
