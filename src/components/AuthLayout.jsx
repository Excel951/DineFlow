import { Box } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#FFC15E", // Warm Yellow sesuai kode awal
      }}
    >
      {children}
    </Box>
  );
};

export default AuthLayout;
