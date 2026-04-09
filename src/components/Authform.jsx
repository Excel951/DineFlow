import { Paper, Typography, Button, Stack } from "@mui/material";

const AuthForm = ({ 
  title, 
  action, 
  isPending, 
  errors, 
  children, 
  submitLabel = "Submit" 
}) => {
  return (
    <form action={action}>
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
          // Box Shadow sesuai kode awal
          boxShadow:
            "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, color: "#D2691E", fontWeight: "bold" }}
        >
          {title}
        </Typography>

        {/* Stack untuk memberi jarak antar input otomatis */}
        <Stack spacing={0} sx={{ width: '100%', alignItems: 'center' }}>
          {children}
        </Stack>

        {/* Render Error sesuai kode awal (menggunakan p red) */}
        {errors && errors.map((error, index) => (
          <p key={index} style={{ color: "red", margin: '4px 0' }}>{error}</p>
        ))}

        <Button
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={isPending}
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
        >
          {isPending ? "Loading..." : submitLabel}
        </Button>
      </Paper>
    </form>
  );
};

export default AuthForm;