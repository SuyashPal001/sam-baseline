
const { success } = require('../../shared/response');

exports.lambdaHandler = async (event, context) => {
  try {
    const response = {
      message: 'pong',
      env: process.env.ENV,
      timestamp: new Date().toISOString()
    };
    return success(response);
  } catch (err) {
    console.error('Handler error:', err);
    return error('Internal server error', 500);
  }
};
