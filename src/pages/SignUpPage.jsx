import React, { useState } from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { UserPlus } from "lucide-react";
import Input from "../components/Input.jsx";

//benerin login dulu
export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    staffId: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validasi form
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Lakukan proses pendaftaran (misal, kirim data ke server)
    console.log("Form submitted:", formData);
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-gray-50"
      sx={{ px: 2, py: 4 }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          className="p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50"
        >
          {/* Header */}
          <Box className="text-center mb-8">
            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="text-orange-600" size={32} />
            </div>
            <Typography variant="h5" className="font-bold text-gray-800">
              Registrasi Karyawan
            </Typography>
            <Typography variant="body2" className="text-gray-500 mt-1">
              Daftarkan akun baru untuk akses sistem DineFlow
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Input
              label="Nama Lengkap"
              value={formData.fullName}
              onChangeName={handleChange("fullName")}
              // Kita bisa tambahkan icon di masa depan jika ingin lebih hias
            />

            <Input
              label="Email Perusahaan"
              type="email"
              value={formData.email}
              onChangeName={handleChange("email")}
            />

            <Input
              label="ID Karyawan"
              value={formData.staffId}
              onChangeName={handleChange("staffId")}
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChangeName={handleChange("password")}
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChangeName={handleChange("confirmPassword")}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              className="mt-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl shadow-lg shadow-orange-200 capitalize font-bold text-lg"
              sx={{ mt: 2, borderRadius: 3, py: 1.5, textTransform: "none" }}
            >
              Daftarkan Akun
            </Button>
          </form>

          {/* Footer Info */}
          <Box className="mt-8 text-center border-t border-gray-100 pt-6">
            <Typography variant="caption" className="text-gray-400">
              Butuh bantuan akses? Hubungi Admin IT DineFlow
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
