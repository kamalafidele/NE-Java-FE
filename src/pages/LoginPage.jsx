import React, { useEffect, useState,  } from "react";
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
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(5).label("Password"),
});

function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    setLoading(true);
    const result = await authApi.login(username, password);
    setLoading(false);

    if (!result.ok) return setError(result.data.status || result.data.error);

    authStorage.storeToken(result.data.jwtToken);

    const user = { name: result.data.username, email: result.data.email, roles: result.data.roles };
    authStorage.storeUser(JSON.stringify(user));
    navigate('/products');
  };

  useEffect(() => {
    if (authStorage.getToken())  navigate('/products');
  }, [navigate]);

  return (
    <Container>
      <div className="logo-container">
        <Logo font_size={40} onClick={() => navigate('/')}/>
      </div>
      <div className="details-container">
        <div>
          <h3 className="header-text" style={{ color: COLOR_PALETTE.GRAY }}>
            Welcome
          </h3>
          <h1 className="header-text">Login to BinSuperMarket</h1>
          <p className="header-text" style={{ color: COLOR_PALETTE.GRAY }}>
            Enter your email and password below
          </p>
        </div>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => handleLogin(values)}
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
                  type={"email"}
                  onChange={handleChange("username")}
                  onBlur={() => setFieldTouched("username")}
                  placeHolder={"Your username"}
                  width={100}
                />
                {touched.username && <ErrorMessage text={errors.username} />}
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
                <Button text={ loading ? 'Loading....' : "Log In"} width={100} onClick={handleSubmit} type='submit'/>
              </div>
            </div>
          )}
        </Formik>

        <div className="other-links">
          <p className="header-text" style={{ margin: "20px 0px 20px 0px" }}>
            Don't have an account? <a href="signup">Sign up</a>
          </p>
          <p className="header-text">
            Forgot your password/login <a href="reset">Reset</a>
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
export default LoginPage;
