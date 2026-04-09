import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router";

import AuthLayout from "../components/AuthLayout";
import AuthForm from "../components/Authform";
import Input from "../components/Input";

import { signUpAction } from "../actions/Auth-Actions";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [state, formAction, isPending] = useActionState(signUpAction, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state, navigate]);

  return (
    <AuthLayout>
      <AuthForm
        title="Staff Registration"
        submitLabel="Daftarkan Akun"
        action={formAction}
        isPending={isPending}
        errors={state?.error ? [state.error] : []}
      >
        <Input label="Nama Lengkap" name="fullName" />
        <Input label="Email Perusahaan" type="email" name="email" />
        <Input label="ID Karyawan" name="staffId" />
        <Input label="Password" type="password" name="password" />
        <Input label="Konfirmasi Password" type="password" name="confirmPassword" />
        
        {state?.success && (
          <p style={{ color: "green", margin: "4px 0", textAlign: "center", width: "100%" }}>
            {state.message}
          </p>
        )}
      </AuthForm>
    </AuthLayout>
  );
}
