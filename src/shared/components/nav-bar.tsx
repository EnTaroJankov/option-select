import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { connect } from "react-redux";

import { StateT } from "../redux/reducers";
import LoginButtonAndPopover from "./login/login-popover";
import LogoutButton from "./login/logout-button";

interface ComponentPropsT {
  username: string | null;
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

  const { username } = props;

  const isLoggedIn = username !== null;

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
          {isLoggedIn ? <LogoutButton /> : <LoginButtonAndPopover />}
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

export default connect(mapStateToProps)(ButtonAppBar);
