import React from "react";

import history from "../history/history";
import { Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Form,
  Input as Int,
  Button as Btn,
  Typography,
  message,
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

class LoginComponent extends React.Component {
  state = {
    email: null,
    password: null,
    loginError: "",
  };

  render() {
    return (
      <main>
        {/* {console.log(this.props)}
        <Paper>
          <Typography component="h5" variant="h6">
            Log In
          </Typography>
          <form onSubmit={(e) => this.submitLogin(e)}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                type="text"
                autoComplete="email"
                autoFocus
                id="login-email-input"
                onChange={(e) => this.userTyping(e.target.value, "email")}
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-password-input">
                Enter Your Password
              </InputLabel>
              <Input
                type="password"
                autoComplete="password"
                id="login-password-input"
                onChange={(e) => this.userTyping(e.target.value, "password")}
              ></Input>
            </FormControl>
            {this.state.loginError ? (
              <Typography component="h5" variant="h6">
                {this.state.loginError}
              </Typography>
            ) : null}

            <Button type="submit" fullWidth variant="contained" color="primary">
              Log In
            </Button>
            <Typography component="h5" variant="h6">
              Don't Have an Account!!!
            </Typography>
          </form>
        </Paper> */}
        <h1 id="header">Create Your Own Notes</h1>
        <Row>
          <Col span={12} offset={6}>
            <div className="site-card-border-less-wrapper" id="loginCard">
              <Card
                title={
                  <div>
                    <h1>
                      <strong>LOG IN</strong>
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
                      onChange={(e) => this.userTyping(e.target.value, "email")}
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

                  <Btn
                    type="primary"
                    htmlType="submit"
                    onClick={(e) => this.submitLogin(e)}
                  >
                    Log In
                  </Btn>
                </Form>
                <Typography>
                  Create an Account <Link to="/signup">Sign Up</Link>
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

      default:
        break;
    }
  };

  submitLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (user) => {
          message.success("login success", [1]);
          history.push("/notes");
        },
        (err) => {
          this.setState({ loginError: err });
          message.error(err.message, [2]);
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
      // case "twitter":
      //   provider = new firebase.auth.TwitterAuthProvider();

      // break;

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
  signoutWithGoogle = () => {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      firebase
        .auth()
        .signOut()
        .then(function () {
          // Sign-out successful.
          history.push("/");
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
        });
    } else {
      // No user is signed in.
      console.log("no users");
    }
  };
}

export default LoginComponent;
