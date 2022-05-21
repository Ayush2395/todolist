import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppState";

export default function VerifyEmail() {
  const { user, logOutUser } = useAppState();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await logOutUser();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <Button onClick={logOut}>Logout</Button>
          <Card>
            <Card.Body>
              <Card.Title>Verify your email</Card.Title>
              <Card.Text>Verification link sent to your {user.email}</Card.Text>
              <Card.Text>Check your spam folder</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
