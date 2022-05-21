import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase.config";
import { useAppState } from "../context/AppState";

export default function Register() {
  const {
    user,
    error,
    email,
    password,
    confirmPass,
    setError,
    setEmail,
    setPassword,
    setConfirmPass,
    registerNewUser,
    passwordValidation,
    registerGoogleUser,
  } = useAppState();

  const navigate = useNavigate();

  const handleRegisterNewUser = async (event) => {
    event.preventDefault();
    setError("");

    passwordValidation();

    try {
      await registerNewUser(email, password);
      navigate("/verifyemail");
    } catch (err) {
      setError({ error: true, msg: err.message });
    }
  };

  const googleUser = async () => {
    try {
      await registerGoogleUser();
      navigate("/todo");
    } catch (err) {
      setError({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (user.emailVerified) {
        navigate("/todo");
      } else if (!user.emailVerified) {
        navigate("/verifyemail");
      }
    });
  }, []);

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {error?.msg && (
            <Alert
              variant={error?.error ? "danger" : "success"}
              dismissible
              onClose={() => setError("")}
            >
              {error?.msg}
            </Alert>
          )}
          <Card>
            <Card.Body>
              <div className="fs-3 mb-3">Register</div>
              <Form onSubmit={handleRegisterNewUser}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Enter your email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="Confirmpassword">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="Confirmpassword"
                    placeholder="Enter your email"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </Form.Group>
                <Button className="mb-3 w-100" type="submit">
                  Register
                </Button>
              </Form>
              <GoogleButton
                className="w-100"
                onClick={googleUser}
                label="Signin with Google"
              />
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>
                Already have an account? <Link to="/">Login</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
