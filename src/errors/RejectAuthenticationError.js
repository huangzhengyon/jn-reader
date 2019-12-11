function RejectAuthenticationError(message) {
  this.name = 'RejectAuthenticationError';  
  this.message = message || 'Default RejectAuthenticationError Message';  
  this.stack = (new Error()).stack;  
}
RejectAuthenticationError.prototype = Object.create(Error.prototype)
RejectAuthenticationError.prototype.constructor = RejectAuthenticationError
export default RejectAuthenticationError
