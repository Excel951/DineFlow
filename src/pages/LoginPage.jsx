import { useActionState, useEffect } from "react";
import Input from "../components/Input";
import { Box, Paper, Typography, Button } from "@mui/material";
import { authActions } from "../store/Auth-redux";
import { loginAction } from "../actions/Auth-Actions";
import { useDispatch, useSelector } from "react-redux";

/* ─── Google Font ─────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap";
if (!document.querySelector('link[href*="Cormorant+Garamond"]')) {
  document.head.appendChild(fontLink);
}

/* ─── CSS ─────────────────────────────────────────────────── */
const css = `
  @keyframes pos-fadein {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pos-floatA {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(20px, 30px) scale(1.06); }
  }
  @keyframes pos-floatB {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(-16px,-22px) scale(1.08); }
  }
  @keyframes pos-pulse-dot {
    0%,100% { transform: scale(1); opacity:1; }
    50%      { transform: scale(1.4); opacity:.6; }
  }
  .pos-card-animate { animation: pos-fadein 0.6s cubic-bezier(.22,.68,0,1.2) 0.1s both; }
`;
if (!document.querySelector("#pos-login-style")) {
  const s = document.createElement("style");
  s.id = "pos-login-style";
  s.textContent = css;
  document.head.appendChild(s);
}

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
        background: "linear-gradient(145deg, #fff8f3 0%, #fef0e4 50%, #fde8d4 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Glow orb top-right */}
      <Box aria-hidden sx={{
        position: "fixed", top: -180, right: -140,
        width: 520, height: 520, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,104,32,0.13) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "pos-floatA 14s ease-in-out infinite alternate",
        pointerEvents: "none", zIndex: 0,
      }} />
      {/* Glow orb bottom-left */}
      <Box aria-hidden sx={{
        position: "fixed", bottom: -100, left: -80,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,167,66,0.15) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "pos-floatB 17s ease-in-out infinite alternate",
        pointerEvents: "none", zIndex: 0,
      }} />
      {/* Subtle grid texture */}
      <Box aria-hidden sx={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(200,120,60,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,120,60,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Brand badge */}
      <Box sx={{
        display: "flex", alignItems: "center", gap: 1.5,
        mb: 3, zIndex: 1,
        animation: "pos-fadein 0.5s ease 0s both",
      }}>
        <Box sx={{
          width: 42, height: 42, borderRadius: "11px",
          background: "linear-gradient(135deg, #e86820, #f5a742)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 21,
          boxShadow: "0 4px 16px rgba(232,104,32,0.35)",
        }}>
          🍽
        </Box>
        <Box>
          <Typography sx={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem", fontWeight: 600,
            color: "#2d1a0e", lineHeight: 1.2, letterSpacing: "0.02em",
          }}>
            RestoPos
          </Typography>
          <Typography sx={{
            fontSize: "0.6rem", color: "#b07040",
            letterSpacing: "0.2em", textTransform: "uppercase",
          }}>
            Restaurant Management
          </Typography>
        </Box>
      </Box>

      {/* Card */}
      <form
        action={formAction}
        className="pos-card-animate"
        style={{ zIndex: 1, width: "100%", maxWidth: 420, padding: "0 16px" }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: "44px 44px 36px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#ffffff",
            border: "1px solid rgba(232,104,32,0.15)",
            boxShadow:
              "0 8px 40px rgba(180,80,20,0.1), 0 2px 8px rgba(180,80,20,0.06)",
          }}
        >
          {/* Eyebrow */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75, alignSelf: "flex-start" }}>
            <Box sx={{ width: 20, height: 1.5, background: "#e86820", borderRadius: 1 }} />
            <Typography sx={{
              fontSize: "0.65rem", letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#e86820",
            }}>
              Akses Karyawan
            </Typography>
          </Box>

          {/* Title — same text as original */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 0.5, alignSelf: "flex-start",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.1rem", fontWeight: 600,
              color: "#2d1a0e", lineHeight: 1.15,
            }}
          >
            Login Karyawan
          </Typography>
          <Typography sx={{ alignSelf: "flex-start", fontSize: "0.82rem", color: "#9a7a60", mb: 3.5 }}>
            Masuk untuk memulai shift Anda
          </Typography>

          {/* Inputs — identical to original */}
          <Input label="email" name="email" defaultValue={userName} />

          <Input
            label="password"
            type="password"
            name="password"
            defaultValue={password}
          />

          {/* Errors — identical logic to original */}
          {errors
            ? errors.map((error) => (
                <p key={error} style={{ color: "red" }}>
                  {error}
                </p>
              ))
            : null}

          {/* Button — identical props to original */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              background: "linear-gradient(135deg, #e86820 0%, #c8530a 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #f07830 0%, #d46010 100%)",
                boxShadow: "0 10px 30px rgba(232,104,32,0.4)",
                transform: "translateY(-1px)",
              },
              "&:active": { transform: "translateY(0)" },
              "&.Mui-disabled": { background: "#f0d0b8", color: "#c0a090" },
              color: "white",
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              py: 1.6,
              textTransform: "none",
              fontSize: "0.95rem",
              letterSpacing: "0.04em",
              mt: 2,
              borderRadius: "10px",
              boxShadow: "0 6px 22px rgba(232,104,32,0.32)",
              transition: "all 0.2s ease",
            }}
            disabled={isPending}
            type="submit"
          >
            Login
          </Button>

          {/* Footer strip */}
          <Box sx={{
            mt: 3.5, pt: 2.5, width: "100%",
            borderTop: "1px solid rgba(232,104,32,0.1)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <Typography sx={{ fontSize: "0.68rem", color: "#c4a488" }}>
              © 2025 RestoPos
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Box sx={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 7px rgba(34,197,94,0.6)",
                animation: "pos-pulse-dot 2.2s ease-in-out infinite",
              }} />
              <Typography sx={{ fontSize: "0.68rem", color: "#c4a488" }}>
                Sistem Online
              </Typography>
            </Box>
          </Box>
        </Paper>
      </form>
    </Box>
  );
}