import axios from 'axios'
import config from './config'
// const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')

export default {

  getSignedURL (file) {
    let endpoint = config.POSTENDPOINT
    let uuid = uuidv4()
    let payload = JSON.stringify({
      name: uuid + file.name,
      type: file.type
    })

    return axios.post(endpoint, payload)
      .then((res) => {
        console.log('res', res.data.uploadURL)
        return Promise.resolve(res.data.uploadURL || '/')
      })
      .catch((err) => {
        console.error('err ', err)
        return Promise.resolve('/')
      })
  },

  deleteObject (photo) {
    // let endpoint = config.DELENDPOINT
    let fileName = photo.split('?')[0].split('/')[3]
    console.log(fileName)
  //   let params = {
  //     Bucket: config.BUCKET,
  //     Key: fileName
  //   }
  //   return axios.delete(endpoint, params)
  //     .then((res) => {
  //       console.log('res in deleteObject', res)
  //     })
  //     .catch((err) => {
  //       console.log('err', err)
  //     })
  }
}
