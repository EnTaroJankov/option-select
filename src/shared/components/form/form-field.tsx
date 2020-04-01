import * as React from "react";
import { FieldProps } from "formik";
import { TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

export const LoginField: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  label,
  field
}) => {
  return <TextField placeholder={placeholder} label={label} {...field} />;
};
