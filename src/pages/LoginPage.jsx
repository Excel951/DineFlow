import { useActionState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import AuthLayout from "../components/AuthLayout";
import AuthForm from "../components/AuthForm";
import Input from "../components/Input";

import { authActions } from "../store/Auth-redux.js";
import { loginAction } from "../actions/Auth-Actions";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const [formState, formAction, isPending] = useActionState(loginAction, {
    error: null,
    success: false,
  });

  // Efek 1: Handle Success Login (Sync Redux)
  useEffect(() => {
    if (formState.success) {
      dispatch(authActions.setUser(formState.user));
      dispatch(authActions.login());
    }
  }, [formState.success, formState.user, dispatch]);

  // Efek 2: Handle Redirect
  useEffect(() => {
    if (isLoggedIn) {
      const lastPath = localStorage.getItem("lastPath");
      const redirectPath = lastPath && lastPath !== "/login" ? lastPath : "/staff/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <AuthLayout>
      <AuthForm
        title="Login Karyawan"
        submitLabel="Login"
        action={formAction}
        isPending={isPending}
        errors={formState.errors}
      >
        <Input
          label="Email"
          name="email"
          defaultValue={user?.user?.enteredValues?.email || ""}
        />
        <Input
          label="Password"
          type="password"
          name="password"
        />
      </AuthForm>
    </AuthLayout>
  );
}
