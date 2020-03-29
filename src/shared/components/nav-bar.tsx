import { Button, Popover } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { connect } from "react-redux";

import { loginRequest } from "../redux/actions/auth";
import { StateT } from "../redux/reducers";
import { LoginForm } from "./login-form";

interface ComponentPropsT {
  username: string;
  doLogin: (username: string, password: string) => void;
  //loginError: string,
}

export interface ContainerPropsT {
  // no props
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

// TODO handle logout
const logoutButton = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };
  return (
    <Button onClick={handleLogout} variant="contained" color="primary">
      Logout
    </Button>
  );
};

function ButtonAppBar(props: ComponentPropsT) {
  const classes = useStyles();

  const { username, doLogin } = props;

  const isLoggedIn = username !== null;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const loginPopover = () => {
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
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {isLoggedIn ? logoutButton() : loginPopover()}
        </Toolbar>
      </AppBar>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
