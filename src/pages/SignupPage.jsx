import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import Input from "../components/Input";
import Logo from "../components/Logo";
import COLOR_PALETTE from "../constants/colors";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import authApi from "../api/auth";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function SignupPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async ({
    username,
    email,
    password,
  }) => {
    setLoading(true);
    const result = await authApi.signup(
      username,
      email,
      password
    );
    setLoading(false);
    
    if (!result.ok) return setError(result.data.status || result.data.error);

    navigate('/');
  };

  return (
    <Container>
      <div className="logo-container">
        <Logo font_size={40} onClick={() => navigate('/')}/>
      </div>
      <div className="details-container">
        <div>
          <h1 className="header-text">Signup</h1>
        </div>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={(values) => handleSignup(values)}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldTouched,
            touched,
            errors,
          }) => (
            <div className="input-container">
              <div className="row" style={{ marginTop: 10, marginBottom: 10 }}>
                {error && <ErrorMessage text={error} />}
              </div>

              <div className="row">
                <label htmlFor="username">Username</label>
                <Input
                  type={"text"}
                  onChange={handleChange("username")}
                  onBlur={() => setFieldTouched("username")}
                  placeHolder={"Username"}
                  width={100}
                />
                {touched.username && <ErrorMessage text={errors.username} />}
              </div>

              <div className="row">
                <label htmlFor="password">Email</label>
                <Input
                  type={"text"}
                  onChange={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  placeHolder={"Email adddress"}
                  width={100}
                />
                {touched.email && <ErrorMessage text={errors.email} />}
              </div>

              <div className="row">
                <label htmlFor="password">Password</label>
                <Input
                  type={"password"}
                  onChange={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  placeHolder={"Your  password"}
                  width={100}
                />
                {touched.password && <ErrorMessage text={errors.password} />}
              </div>

              <div className="row">
                <Button text={loading ? 'Loading.....' : "Sign Up"} width={100} onClick={handleSubmit} />
              </div>
            </div>
          )}
        </Formik>

        <div className="other-links">
          <p className="header-text" style={{ margin: "10px 0px 10px 0px" }}>
            Already have an account? <a href="/">login</a>
          </p>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: ${COLOR_PALETTE.PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;

  .logo-container {
    width: 30%;
  }
  .details-container {
    width: 40%;
    padding: 20px;
    border-radius: 10px;
    align-items: center;
    background-color: ${COLOR_PALETTE.WHITE};
    .header-text {
      text-align: center;
      margin: 10px 0px 10px 0px;
    }

    a {
      text-decoration: none;
    }
  }

/* FOR RESPONSIVENESS */
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
`;
export default SignupPage;
