const REGEX_EMAIL_VALIDATION =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;

const REGEX_CPF_VALIDATION = /(\d{3})(\d{3})(\d{3})(\d{2})/;

const REGEX_PASSWORD_VALIDATION =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%<>:?,.¨&*()+=-])[0-9a-zA-Z.!@#$%<>:?,.¨&*()+=-]{6,20}$/;

export {
  REGEX_CPF_VALIDATION,
  REGEX_EMAIL_VALIDATION,
  REGEX_PASSWORD_VALIDATION,
};
