import { Button } from "@material-ui/core";
import React from "react";
import { logoutRequest } from "../../redux/actions/auth";
import { connect } from "react-redux";

interface Props {
  onLogout: () => void;
}

function LogoutButton(props: Props) {
  return (
    <Button variant="contained" color="primary" onClick={props.onLogout}>
      Logout
    </Button>
  );
}

const mapDispatchToProps = (dispatch: (action: any) => void) => {
  return {
    onLogout: () => {
      dispatch(logoutRequest());
    }
  };
};

export default connect(null, mapDispatchToProps)(LogoutButton);
