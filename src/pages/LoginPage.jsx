import { useActionState, useEffect } from "react";
import Input from "../components/Input";
import { Box, Paper, Typography, Button } from "@mui/material";
import { authActions } from "../store/Auth-redux";
import { loginAction } from "../actions/Auth-Actions";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();

  const { userName, password } = useSelector((state) => state.auth);

  const [formState, formAction, isPending] = useActionState(loginAction, {
    error: null,
    success: false,
  });

  const errors = formState.errors;

  console.log(formState);

  useEffect(() => {
    if (formState.success === true) {
      dispatch(authActions.setUsername(formState.enteredValues.email));
      dispatch(authActions.setPassword(formState.enteredValues.password));
    }
  }, [formState, dispatch]);

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

          <button
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
          </button>
        </Paper>
      </form>
    </Box>
  );
}
