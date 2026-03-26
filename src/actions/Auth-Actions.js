import { hasMinLength, isEmail, isNotEmpty } from "../utils/validation";

export function loginAction(prevFormState, formData) {
  const data = Object.fromEntries(formData);
  let errors = [];

  if (!isNotEmpty(data.email) && !isEmail(data.email) && !hasMinLength()) {
    errors.push("Email tidak valid");
  }

  if (!isNotEmpty(data.password) && !hasMinLength(data.password, 6)) {
    errors.push("Isi Email dan Password");
  }

  if (errors.length > 0) {
    return {
      errors,
      success: false,
      enteredValues: {
        email: data.email,
        password: data.password,
      },
    };
  }

  return {
    errors: null,
    success: true,
    enteredValues: {
      email: data.email,
      password: data.password,
    },
  };
}
