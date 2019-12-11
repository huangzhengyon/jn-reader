function CancelAuthenticationError(message) {
  this.name = 'CancelAuthenticationError';  
  this.message = message || 'Default CancelAuthenticationError Message';  
  this.stack = (new Error()).stack;  
}
CancelAuthenticationError.prototype = Object.create(Error.prototype)
CancelAuthenticationError.prototype.constructor = CancelAuthenticationError
export default CancelAuthenticationError
