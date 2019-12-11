function CustomError(message) {
  this.name = 'CustomError';  
  this.message = message || 'Default CustomError Message';  
  this.stack = (new Error()).stack;  
}
CustomError.prototype = Object.create(Error.prototype)
CustomError.prototype.constructor = CustomError
export default CustomError
