function InnerError(message) {
  this.name = 'InnerError';  
  this.message = message || 'Default InnerError Message';  
  this.stack = (new Error()).stack;  
}
InnerError.prototype = Object.create(Error.prototype)
InnerError.prototype.constructor = InnerError
export default InnerError
