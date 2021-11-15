class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message);
    this.status = status;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export default HttpError