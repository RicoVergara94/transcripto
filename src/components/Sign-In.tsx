import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios"; // axios for backend integration
import { useNavigate } from "react-router-dom"; // For navigation

const theme = createTheme({
  palette: {
    background: {
      default: "#f0f0f0", // Light grey background
    },
    primary: {
      main: "#000", // Black for primary elements
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
    h5: {
      fontWeight: 600, // Bold and stylish font for the heading
    },
  },
});

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [emailOrPhone, setEmailOrPhone] = React.useState("");
  const [codeSent, setCodeSent] = React.useState(false);
  const [timer, setTimer] = React.useState(30);
  const [code, setCode] = React.useState("");
  const [codeVerified, setCodeVerified] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('/api/login', {
      email: data.get("email"),
      password: data.get("password"),
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  const handleForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleSendCode = () => {
    // Simulate sending code
    setCodeSent(true);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCodeSent(false);
          setTimer(30);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyCode = () => {
    // Simulate code verification
    if (code === "123456") { // Example code for demonstration
      setCodeVerified(true);
      setOpenForgotPassword(false);
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  const validatePassword = (password: string) => {
    const minLength = /.{8,}/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    if (!minLength.test(password)) return "Password must be at least 8 characters long.";
    if (!specialChar.test(password)) return "Password must contain at least one special character.";
    if (!upperCase.test(password) && !lowerCase.test(password)) return "Password must contain at least one upper case or lower case character.";
    if (password.includes("yourname")) return "Password cannot contain your name."; // Replace "yourname" with actual logic

    return "";
  };

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    if (password !== passwordConfirm) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    axios.post('/api/signup', {
      email,
      password,
    }).then(response => {
      console.log(response.data);
      setOpenSignUp(false); // Close the Sign-Up dialog on success
    }).catch(error => {
      console.error(error);
    });
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
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src="/logo512.png"
            alt="Transcripto Logo"
            style={{ width: "100px", marginBottom: "20px" }}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#000",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#333",
                },
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={handleForgotPassword}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setOpenSignUp(true)}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

        <Dialog open={openForgotPassword} onClose={() => setOpenForgotPassword(false)}>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your email address or phone number to receive a login code.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="emailOrPhone"
              label="Email Address or Phone Number"
              type="text"
              fullWidth
              variant="standard"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            {codeSent && (
              <>
                <Typography variant="body2" color="textSecondary">
                  Code sent! Please enter the code within {timer} seconds.
                </Typography>
                <TextField
                  margin="dense"
                  id="code"
                  label="Enter Code"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForgotPassword(false)}>Cancel</Button>
            {codeSent ? (
              <Button onClick={handleVerifyCode}>
                Verify Code
              </Button>
            ) : (
              <Button onClick={handleSendCode}>
                Send Code
              </Button>
            )}
          </DialogActions>
        </Dialog>

        <Dialog open={openSignUp} onClose={() => setOpenSignUp(false)}>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your email address and create a password to sign up.
            </DialogContentText>
            <Box
              component="form"
              onSubmit={handleSignUp}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="signUpEmail"
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
                name="signUpPassword"
                label="Password"
                type="password"
                id="signUpPassword"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="signUpPasswordConfirm"
                label="Confirm Password"
                type="password"
                id="signUpPasswordConfirm"
                autoComplete="new-password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {passwordError && (
                <Typography color="error" variant="body2">
                  {passwordError}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#000",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
