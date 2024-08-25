import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007FFF",
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpMode, setSignUpMode] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", userCredential.user);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Failed to sign in. Please check your credentials and try again.");
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up:", userCredential.user);

      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "transparent", // Set background color to transparent
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)", // Soft shadow
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {signUpMode ? "Sign Up" : "Sign In"}
          </Typography>
          <Box component="form" onSubmit={signUpMode ? handleSignUp : handleSignIn} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {signUpMode && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {signUpMode ? "Sign Up" : "Sign In"}
            </Button>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setSignUpMode(!signUpMode)}>
                  {signUpMode ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
