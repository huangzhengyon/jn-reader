function PaymentCancellationBecauseOfFreementError(message) {
  this.name = 'PaymentCancellationBecauseOfFreementError';  
  this.message = message || 'Default NetworkError Message';  
  this.stack = (new Error()).stack;  
}

PaymentCancellationBecauseOfFreementError.prototype = Object.create(Error.prototype)
PaymentCancellationBecauseOfFreementError.prototype.constructor = PaymentCancellationBecauseOfFreementError
export default PaymentCancellationBecauseOfFreementError