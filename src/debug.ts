const Debugger = require('debug');

const error = Debugger('lotus-tools:error');
const log = Debugger('lotus-tools: ');
const success = Debugger('lotus-tools:success');

export default {
  log,
  error,
  success
}
