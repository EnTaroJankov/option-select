import { render, getByText } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import App from "./App";
import store from "./shared/redux/store";

test("renders login button", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const loginButton = getByText("Login");
  expect(loginButton).toBeInTheDocument();
});
