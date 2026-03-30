import z from "zod";
import { hashPassword } from "../utils/auth";
import { SignUpSchema } from "../utils/staffSchema";
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

export async function signUpAction(prevState, formData) {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const result = SignUpSchema.safeParse(rawData);

    if (!result.success) {
      const errorMessages =
        JSON.parse(result.error.message)[0].message || "Data tidak valid.";
      return { error: errorMessages, success: false };
    }

    const validatedData = result.data;

    if (validatedData.password !== validatedData.confirmPassword) {
      return { error: "Password dan konfirmasi password tidak cocok." };
    }

    //     Cek database untuk hindari duplikasi email atau ID karyawan

    const hashedPassword = await hashPassword(validatedData.password);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      success: true,
      message: "Karyawan berhasil didaftarkan dengan aman!",
    };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { error: JSON.parse(e.error.message)[0].message };
    }
    return {
      error: "Terjadi kesalahan saat mendaftarkan karyawan.",
    };
  }
}
