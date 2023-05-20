import { useState } from "react";
import { AdminLoginFieldSchema } from "../schema/common";
import { ADMIN_USER } from "../config/adminCredientals";
import { ADMIN_PASS } from "../config/adminCredientals";
import { styled } from "styled-components";

const LoginPanel = () => {
  const [formData, setFormData] = useState<AdminLoginFieldSchema>({
    name: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (form: React.FormEvent<HTMLFormElement>) => {
    form.preventDefault();
    const { name, password } = formData;
    if (name !== ADMIN_USER || password !== ADMIN_PASS) {
      setErrorMessage("Invalid username or password.");
      return;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            value={formData.name}
            onChange={handleInputChange}
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
            value={formData.password}
            onChange={handleInputChange}
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
