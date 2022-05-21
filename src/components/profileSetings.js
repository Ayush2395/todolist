import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useAppState } from "../context/AppState";

function ProfileSettings() {
  const { user, error, setError } = useAppState();

  const [userName, setUserName] = useState("");

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const updateData = { displayName: userName };

    await updateProfile(user, updateData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.messsage));

    setError({ error: false, msg: "Changes saved" });

    setUserName("");
  };

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
              onClose={() => {
                setError("");
              }}
            >
              {error?.msg}
            </Alert>
          )}
          <Card>
            <Card.Body>
              <Card.Text>Name: {user.displayName}</Card.Text>
              <hr />
              <Form onSubmit={handleUpdateProfile}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="name">Your name</Form.Label>
                  <Form.Control
                    id="name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="mb-3 w-100"
                  variant="outline-info"
                >
                  Save profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default ProfileSettings;
