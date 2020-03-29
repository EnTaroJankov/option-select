import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { LoginField } from "./form-field";

interface Credentials {
  username: string;
  password: string;
}

interface Props {
  onSubmit: (credentials: Credentials) => void;
}

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <Field
              name="username"
              placeholder="Username"
              component={LoginField}
            />
          </div>
          <div>
            <Field
              name="password"
              placeholder="Password"
              component={LoginField}
            />
          </div>
          <Button type="submit">Login</Button>
        </Form>
      )}
    </Formik>
  );
};
