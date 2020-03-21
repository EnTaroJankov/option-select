import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { StateT } from "../redux/reducers";
import { loginRequest } from "../redux/actions/auth";

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

function ButtonAppBar(props: ComponentPropsT) {
  const classes = useStyles();

  const { username, doLogin } = props;

  const isLoggedIn = username !== null;

  const onClickLogin = () => {
    doLogin("username", "password");
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
          {!isLoggedIn ? (
            <Button color="inherit" onClick={onClickLogin}>
              Login
            </Button>
          ) : null}
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
