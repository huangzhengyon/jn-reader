function InitializeError(message) {
  this.name = 'InitializeError';  
  this.message = message || 'Default InitializeError Message';  
  this.stack = (new Error()).stack;  
}
InitializeError.prototype = Object.create(Error.prototype)
InitializeError.prototype.constructor = InitializeError
export default InitializeError
