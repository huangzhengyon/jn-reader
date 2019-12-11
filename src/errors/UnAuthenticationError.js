function UnAuthenticationError(message) {
  this.name = 'UnAuthenticationError';  
  this.message = message || 'Default Message';  
  this.stack = (new Error()).stack;  
  console.log(message,1)
}
UnAuthenticationError.prototype = Object.create(Error.prototype)
UnAuthenticationError.prototype.constructor = UnAuthenticationError
export default UnAuthenticationError
