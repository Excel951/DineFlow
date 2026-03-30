import React, { useActionState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Fade,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { AlertCircle, CheckCircle2, UserPlus } from "lucide-react";
import Input from "../components/Input.jsx";
import { useNavigate } from "react-router";
import { signUpAction } from "../actions/Auth-Actions.js";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [state, formAction, isPending] = useActionState(signUpAction, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success === true) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state, navigate]);

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-10">
      <Container maxWidth="xs" className="relative">
        <Paper
          elevation={0}
          className="relative overflow-hidden p-8 rounded-[2rem] border border-gray-100 shadow-2xl shadow-orange-100/50 bg-white"
        >
          {/* Progress Bar */}
          {isPending && (
            <LinearProgress
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#ea580c", // Warna orange-600
                },
                backgroundColor: "#ffedd5", // Warna orange-100 (track)
              }}
            />
          )}

          {/* Header Section */}
          <Box className="text-center mb-8">
            <div className="bg-orange-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 rotate-3 hover:rotate-0 transition-transform duration-300">
              <UserPlus className="text-orange-600" size={36} />
            </div>
            <Typography
              variant="h5"
              className="font-extrabold text-gray-900 tracking-tight"
            >
              Staff Registration
            </Typography>
            <Typography variant="body2" className="text-gray-400 mt-2">
              Lengkapi data untuk akses dashboard DineFlow
            </Typography>
          </Box>

          {/* Feedback Status - Lebih Indah & Layak Pandang */}
          <Box className="mb-6 h-14 flex items-center">
            {state?.error && (
              <Fade in={!!state.error}>
                <Alert
                  severity="error"
                  icon={<AlertCircle size={18} />}
                  className="w-full rounded-xl font-medium border border-red-100"
                >
                  {state.error}
                </Alert>
              </Fade>
            )}
            {state?.success && (
              <Fade in={!!state.success}>
                <Alert
                  severity="success"
                  icon={<CheckCircle2 size={18} />}
                  className="w-full rounded-xl font-medium border border-green-100"
                >
                  {state.message}
                </Alert>
              </Fade>
            )}
          </Box>

          {/* Form Section */}
          <form action={formAction} className="space-y-1">
            <Input label="Nama Lengkap" name="fullName" />
            <Input label="Email Perusahaan" type="email" name="email" />
            <Input label="ID Karyawan" name="staffId" />
            <Input label="Password" type="password" name="password" />
            <Input
              label="Konfirmasi Password"
              type="password"
              name="confirmPassword"
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isPending}
              className={`mt-6 py-4 rounded-2xl font-black text-lg transition-all duration-300 ${
                isPending
                  ? "bg-gray-200"
                  : "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200"
              }`}
              sx={{ mt: 3, textTransform: "none", borderRadius: "16px" }}
            >
              {isPending ? (
                <span className="flex items-center gap-2">Memproses...</span>
              ) : (
                "Daftarkan Akun"
              )}
            </Button>
          </form>

          {/* Footer Info */}
          <Box className="mt-10 text-center border-t border-dashed border-gray-200 pt-6">
            <Typography variant="caption" className="text-gray-400 block mb-1">
              Keamanan data karyawan terenkripsi.
            </Typography>
            <Typography
              variant="caption"
              className="font-bold text-orange-600 cursor-pointer hover:underline"
            >
              Hubungi Admin IT
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
