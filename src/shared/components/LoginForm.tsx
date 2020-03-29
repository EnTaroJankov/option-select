import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as React from "react";

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
            <TextField name="username" placeholder="Username" />
          </div>
          <div>
            <TextField name="password" placeholder="Password" />
          </div>
          <Button type="submit">Login</Button>
        </Form>
      )}
    </Formik>
  );
};
