import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { connect } from "react-redux";

import { loginRequest } from "../../redux/actions/auth";
import { StateT } from "../../redux/reducers";
import { LoginField } from "../form/text-field";

interface Props {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={values => {
        onSubmit(values.username, values.password);
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <Field
              name="username"
              placeholder="Username..."
              label="Username"
              component={LoginField}
            />
          </div>
          <div>
            <Field
              name="password"
              placeholder="Password..."
              label="Password"
              component={LoginField}
            />
          </div>
          <Button type="submit" fullWidth>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state: StateT) => {
  return {
    username: state.auth.username
  };
};

const mapDispatchToProps = (dispatch: (action: any) => void) => {
  return {
    onSubmit: (username: string, password: string) => {
      dispatch(loginRequest(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
