class ApiError extends Error {
  public readonly statusCode: number;

  constructor(error_description: string, error_code: number) {
    super(error_description);
    this.statusCode = error_code;
  }
}

export { ApiError };
