import { useActionState, useEffect } from "react";
import Input from "../components/Input";
import { Box, Paper, Typography, Button } from "@mui/material";
import { authActions } from "../store/Auth-redux";
import { isEmail, isNotEmpty, hasMinLength } from "../utils/validation.js";
import { useDispatch, useSelector } from "react-redux";

function loginAction(prevFormState, formData) {
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

const LoginPage = () => {
  const dispatch = useDispatch();

  const { userName, password } = useSelector((state) => state.auth);

  const [formState, formAction, isPending] = useActionState(loginAction, {
    error: null,
  });

  const errors = formState.errors;

  console.log(formState);

  useEffect(() => {
    if (formState.success === true) {
      dispatch(authActions.setUsername(formState.enteredValues.email));
      dispatch(authActions.setPassword(formState.enteredValues.password));
    }
  }, [formState, dispatch]);

  /* ganti redux biar bisa 1 file code sama signup */

  // const [login, setLogin] = useState({
  //   loginInfo: { email: "", password: "" },
  // });
  // const [errors, setErrors] = useState(false);

  // const handleLogin = (event) => {
  //   event.preventDefault();

  //   const { email, password } = login.loginInfo;

  //   // Perform validation
  //   const hasError = !email || !email.includes("@") || !password;

  //   // Update state based on the validation result
  //   setErrors(hasError);

  //   // Act based on the validation result
  //   if (hasError) {
  //     console.log("Data tidak terkirim");
  //     return;
  //   }

  //   console.log("Data terkirim");
  //   console.log(login);
  // };

  // function handleLoginInfo(key, value) {
  //   setLogin((prevLogin) => ({
  //     ...prevLogin,
  //     loginInfo: {
  //       ...prevLogin.loginInfo,
  //       [key]: value,
  //     },
  //   }));

  //   // If there was an error, and the user is typing, hide the error message.
  //   if (errors) {
  //     setErrors(false);
  //   }
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#FFC15E", // Warm Yellow
      }}
    >
      <form action={formAction}>
        <Paper
          elevation={6}
          sx={{
            padding: "40px",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "400px",
            width: "100%",
            boxShadow:
              "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 4, color: "#D2691E", fontWeight: "bold" }}
          >
            Login Karyawan
          </Typography>

          <Input label="email" name="email" defaultValue={userName} />

          <Input
            label="password"
            type="password"
            name="password"
            defaultValue={password}
          />
          {errors
            ? errors.map((error) => <p style={{ color: "red" }}>{error}</p>)
            : null}

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              backgroundColor: "#D2691E", // Burnt Orange
              "&:hover": {
                backgroundColor: "#A0522D",
              },
              color: "white",
              fontWeight: "bold",
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              mt: 2,
            }}
            disabled={isPending}
            type="submit"
          >
            Login
          </Button>
        </Paper>
      </form>
    </Box>
  );
};

export default LoginPage;
