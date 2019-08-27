const Debugger = require('debug');

const error = Debugger('lotus-tools:error');
const success = Debugger('lotus-tools:success');

export default {
  error,
  success
}
