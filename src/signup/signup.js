import React from "react";
import { Link } from "react-router-dom";
import history from "../history/history";
import {
  Card,
  Row,
  Col,
  Form,
  Input as Int,
  Button as Btn,
  Typography,
} from "antd";

import "../App.css";

const firebase = require("firebase");

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

export default class SignupComponent extends React.Component {
  state = {
    email: null,
    password: null,
    confirmedPassword: null,
    signupError: "",
  };
  render() {
    return (
      <main>
        {/* {console.log(this.props)}
        <Paper>
          <Typography variant="h6" component="h5">
            SIGN UP
          </Typography>
          <form onSubmit={this.submitSignup}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                type="text"
                autoComplete="email"
                autoFocus
                id="signup-email-input"
                onChange={(e) => this.userTyping(e.target.value, "email")}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">
                Enter Your Password
              </InputLabel>
              <Input
                type="password"
                id="signup-password-input"
                onChange={(e) => this.userTyping(e.target.value, "password")}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-confirmedPassword-input">
                Confirm Your Password
              </InputLabel>
              <Input
                type="password"
                id="signup-confirmedPassword-input"
                onChange={(e) =>
                  this.userTyping(e.target.value, "confirmedPassword")
                }
              ></Input>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              SIGN UP
            </Button>
            {this.state.signupError ? (
              <Typography>{this.state.signupError}</Typography>
            ) : null}
            <Typography component="h5" variant="h6">
              Already Have An Account !!
            </Typography>
          </form>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.signinWithGoogle("google")}
          >
            SIGN IN WITH GOOGLE
          </Button>
          <Button
            variant="contained"
            onClick={() => this.signinWithGoogle("facebook")}
          >
            SIGN IN WITH FACEBOOK
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.signinWithGoogle("twitter")}
          >
            SIGN IN WITH TWITTER
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.signoutWithGoogle}
          >
            SIGN OUT
          </Button>
        </Paper> */}
        <div>
          <h1 id="header">Create Your Own Notes</h1>
          <Row>
            <Col span={12} offset={6}>
              <div className="site-card-border-less-wrapper" id="signupCard">
                <Card
                  title={
                    <div>
                      <h1>
                        <strong>SIGN UP</strong>
                      </h1>
                    </div>
                  }
                  bordered={true}
                >
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Int
                        onChange={(e) =>
                          this.userTyping(e.target.value, "email")
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Int.Password
                        onChange={(e) =>
                          this.userTyping(e.target.value, "password")
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label="Confirm Password"
                      name="confirmedPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                      ]}
                    >
                      <Int.Password
                        onChange={(e) =>
                          this.userTyping(e.target.value, "confirmedPassword")
                        }
                      />
                    </Form.Item>

                    <Btn
                      type="primary"
                      htmlType="submit"
                      onClick={this.submitSignup}
                    >
                      Sign Up
                    </Btn>
                  </Form>
                  <Typography>
                    Already Have an Account <Link to="/">Log In</Link>
                  </Typography>
                  <Typography>OR</Typography>
                  <Btn
                    type="primary"
                    danger
                    onClick={() => this.signinWithGoogle("google")}
                  >
                    Google Sign In
                  </Btn>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    );
  }

  userTyping = (txt, type) => {
    switch (type) {
      case "email":
        this.setState({ email: txt });

        break;
      case "password":
        this.setState({ password: txt });

        break;
      case "confirmedPassword":
        this.setState({ confirmedPassword: txt });

        break;

      default:
        break;
    }
  };

  formisValid = () => this.state.password === this.state.confirmedPassword;

  submitSignup = (e) => {
    e.preventDefault();
    if (!this.formisValid()) {
      this.setState({ signupError: "Passwords do not Match" });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (authRes) => {
          const userObj = {
            email: authRes.user.email,
          };
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email)
            .set(userObj)
            .then(
              () => {
                history.push("/notes");
              },
              (dbErr) => {
                console.log(dbErr);
              }
            );
        },
        (authError) => {
          console.log(authError);
        }
      );
  };

  signinWithGoogle = (type) => {
    console.log("hello");
    var provider = null;
    switch (type) {
      case "google":
        provider = new firebase.auth.GoogleAuthProvider();

        break;
      case "facebook":
        provider = new firebase.auth.FacebookAuthProvider();

        break;
      case "twitter":
        provider = new firebase.auth.TwitterAuthProvider();

        break;

      default:
        break;
    }

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log(token);

        // The signed-in user info.
        var user = result.user;

        const userObj = {
          email: user.email,
        };
        firebase
          .firestore()
          .collection("users")
          .doc(user.email)
          .set(userObj)
          .then(
            () => {
              history.push("/notes");
            },
            (dbErr) => {
              console.log(dbErr);
            }
          );
      })
      .catch(function (error) {
        // Handle Errors here.

        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(email, credential);
        // ...
      });
  };
}
