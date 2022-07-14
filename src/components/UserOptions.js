import React, { Fragment, useState } from "react";
import "../style/UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";

const UserOptions = ({ image, auth }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const options = [
    { icon: <PersonIcon />, name: "Account", func: account },
    { icon: <ListAltIcon />, name: "StudentSection", func: student },
    { icon: <DashboardIcon />, name: "TeacherSection", func: teacher },
    { icon: <ExitToAppIcon />, name: "SignOut", func: signout },
  ];

  function account() {
    history.push("/account");
  }
  function student() {
    history.push("/student");
  }
  function teacher() {
    history.push("/teacher");
  }
  function signout() {
    auth.signOut();
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={<img className="speedDialIcon" src={image} alt="" />}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            // tooltipOpen={window.innerWidth <= 600 ? true : false}
            tooltipOpen={true}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
