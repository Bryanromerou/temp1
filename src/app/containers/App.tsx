import React, { useState } from "react";
import GlobalNavBar from "app/components/GlobalNavBar";
import Dashboard from "app/containers/Dashboard";
import AdminConsole from "app/containers/AdminConsole";
import TeamGuide from "app/containers/TeamGuide";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

// Temporary Work
const tempPassword = process.env.REACT_APP_TEMP_PASSWORD;

export default function App() {
  // -------- Temporary Work  -----
  const [error, setError] = useState<"Wrong Password" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const checkPassword = e => {
    e.preventDefault();
    if (password === tempPassword) {
      setIsAuthenticated(true);
    } else {
      setError("Wrong Password");
    }
  };

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <>
          <GlobalNavBar />
          <Routes>
            <Route path={"/"} element={<Dashboard />} />
            <Route path="/teaming-v2" element={<Dashboard />} />
            <Route path="/AdminConsole" element={<AdminConsole />} />
            <Route path="/TeamGuide" element={<TeamGuide />} />
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
            <Route path="*" element={<div>404: Page Not Found</div>} />
          </Routes>
        </>
      ) : (
        <Form onSubmit={checkPassword}>
          {error}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => {
                setError(null);
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </BrowserRouter>
  );
}
