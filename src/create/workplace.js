


module.exports = function(wpName = '', wpPath = '') {
  console.log('handle create work place', wpName, wpPath);
  if (!wpName || !wpPath) {
    return {
      resCode: 400,
      data: {
        resCode: 400,
        data: {
          message: 'params error.'
        }
      }
    };
  }

  return {
    resCode: 200,
    data: {
      resCode: 200
    }
  };
};
