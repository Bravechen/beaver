const axios = require('axios');
const Qs = require('qs');

const config = {
  post: {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    responseType: 'json',
    timeout: 5000,
    transformRequest(data) {
      return Qs.stringify(data);
    },
    transformResponse(res) {
      return res;
    }
  },
  upload: {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    responseType: 'json',
    timeout: 60000,
    transformRequest: [
      function(data) {
        return data;
      }
    ]
  }
};

module.exports = {
  async post(url = '', params = {}) {
    return await axios
      .post(url, params, config['post'])
      .then(res => res.data)
      .catch(error => error);
  },
  async get(url, params = {}) {
    return await axios
      .get(url, params)
      .then(res => res.data)
      .catch(error => error);
  },
  async upload(url, params = {}, progressFn) {
    let uploadConfig = config['upload'];
    if (typeof progressFn === 'function') {
      uploadConfig = Object.assign(uploadConfig, {
        onUploadProgress(e) {
          progressFn(e, e.loaded / e.total);
        }
      });
    }
    return await axios
      .post(url, params, uploadConfig)
      .then(res => res.data)
      .catch(error => error);
  }
};
