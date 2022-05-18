export interface ValidationResult {
  isValid: boolean;
  errorMessages: string[];
}

export interface Validator<T> {
  check: (value: T) => boolean;
  errorMsg: string;
}

function validate<T>(
  value: T,
  validators: Array<Validator<T>>,
): ValidationResult {

  const errorMessages = [];

  for (const validator of validators) {
    if (!validator.check(value)) {
      errorMessages.push(validator.errorMsg);
    }
  }

  return {
    isValid: errorMessages.length === 0,
    errorMessages,
  };
}

export default validate;
