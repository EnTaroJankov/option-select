import { Button, Popover } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

import { loginRequest } from "../../redux/actions/auth";
import { StateT } from "../../redux/reducers";
import { LoginForm } from "../form/login-form";

interface ComponentPropsT {
  doLogin: (username: string, password: string) => void;
}

function LoginButtonAndPopover(props: ComponentPropsT) {
  const { doLogin } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Login
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <LoginForm
            onSubmit={({ username, password }) => {
              doLogin(username, password);
            }}
          />
        </div>
      </Popover>
    </>
  );
}

const mapStateToProps = (state: StateT) => {
  return {
    username: state.auth.username
  };
};

const mapDispatchToProps = (dispatch: (action: any) => void) => {
  return {
    doLogin: (username: string, password: string) => {
      dispatch(loginRequest(username, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButtonAndPopover);
