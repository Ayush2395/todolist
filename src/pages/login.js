import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase.config";
import { useAppState } from "../context/AppState";

export default function Login() {
  const {
    user,
    error,
    email,
    password,
    setError,
    setEmail,
    setPassword,
    inputFieldValidation,
    loginNewUser,
    googleUser,
  } = useAppState();

  const navigate = useNavigate();

  const handleLoginUser = async (event) => {
    event.preventDefault();
    setError("");

    inputFieldValidation();

    try {
      await loginNewUser(email, password);
      navigate("/todo");
    } catch (err) {
      setError({ error: true, msg: err.message });
      console.log(err.message);
    }

    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = async () => {
    try {
      await googleUser();
      navigate("/todo");
    } catch (err) {
      setError({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser.emailVerified) {
        navigate("/todo");
      } else if (!currentUser.emailVerified) {
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
              <div className="fs-3 mb-3">Login</div>
              <Form onSubmit={handleLoginUser}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Button className="mb-3 w-100" type="submit">
                  Login
                </Button>
              </Form>

              <GoogleButton
                onClick={handleGoogleLogin}
                className="w-100"
                label="Login with Google"
              />
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>
                Don't have an account?<Link to="/register">Register</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
