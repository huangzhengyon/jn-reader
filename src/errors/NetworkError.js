function NetworkError(message) {
  this.name = 'NetworkError';  
  this.message = message || 'Default NetworkError Message';  
  this.stack = (new Error()).stack;  
}
NetworkError.prototype = Object.create(Error.prototype)
NetworkError.prototype.constructor = NetworkError
export default NetworkError
