import { useState } from "react";
import { ADMIN_USER } from "../config/adminCredientals";
import { ADMIN_PASS } from "../config/adminCredientals";
import { styled } from "styled-components";
import { useIsLoggedInContext } from "../storage/IsLoggedInContext";

const LoginPanel = () => {
  const { logIn, loggedIn } = useIsLoggedInContext();

  console.log("loggedIn", loggedIn);

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const password = formData.get("password");
    console.log(name, password);

    if (name !== ADMIN_USER || password !== ADMIN_PASS) {
      setErrorMessage("Invalid username or password.");
      return;
    }
    console.log("Log In success");
    logIn();
    console.log("running");
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Header>Otaku Emporium</Header>
        {errorMessage && (
          <div className="alert alert-warning" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Jhon Doe"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="*****"
            className="form-control"
            required
          />
        </div>
        <ButtonContainer>
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default LoginPanel;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
`;

const Header = styled.h1`
  margin-block: 2rem;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;
