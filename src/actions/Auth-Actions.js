import z from "zod";
import { hashPassword } from "../utils/auth";
import { SignUpSchema } from "../utils/staffSchema";
import { hasMinLength, isEmail, isNotEmpty } from "../utils/validation";

export async function loginAction(prevFormState, formData) {
  try {
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

    // Simulasi pengiriman data ke backend menggunakan fetch (Standar Industri)
    // fetch aman digunakan karena merupakan native API browser yang modern.
    const response = await fetch("http://localhost:6969/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password, // Data terenkripsi jika menggunakan HTTPS
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: [errorData.message || "Login gagal, silakan cek kredensial Anda."],
        success: false,
        enteredValues: { email: data.email, password: data.password },
      };
    }

    const resData = await response.json();

    console.log("Login Success:", resData);

    if (resData.token) {
        localStorage.setItem("authToken", resData.token);
    }

    return {
      errors: null,
      success: true,
      token: resData.token, // Simpan token di storage yang aman (misal: HttpOnly Cookie)
      user: resData.User
    };
  } catch (error) {
    console.log("Login Error:", error);
    // Handle network errors atau issues lainnya
    return {
      errors: ["Koneksi ke server gagal. Silakan coba lagi nanti."],
      success: false,
      enteredValues: { email: data.email, password: data.password },
    };
  }
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
