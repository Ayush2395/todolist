import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/UserAuthState";
import { auth } from "../service/firebase.config";

function Login() {
  const { loginUser, user, googleAuth } = useAuthContext();
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");

    if (email === "" || password === "") {
      setMessage({ error: true, msg: "Enter the required field" });
      return;
    }

    try {
      await loginUser(email, password);
      navigate("/home");
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (user) {
        navigate("/home");
      }
    });
  });

  const handleGoogleAuth = async (event) => {
    event.preventDefault();
    try {
      await googleAuth();
      navigate("/home");
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }
  };

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => setMessage("")}
            >
              {message?.msg}
            </Alert>
          )}
          <Card>
            <Card.Body>
              <h1 className="w-100">Login</h1>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Your mail"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Your password"
                  />
                </Form.Group>
                <Button type="submit" className="w-100 mb-3">
                  Login
                </Button>
                <hr />
                <GoogleButton
                  onClick={handleGoogleAuth}
                  className="w-100 mb-3"
                  label="Login with Google"
                />
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>
                Don't have an account? <Link to="/register">Register</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default Login;
