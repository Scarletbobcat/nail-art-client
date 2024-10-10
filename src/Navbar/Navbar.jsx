import { Link } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

function Navbar() {
  const navItems = [
    {
      title: "Appointments",
      subMenu: [
        {
          title: "Search",
          url: "/Appointments/Search",
        },
        {
          title: "Calendar",
          url: "/Appointments",
        },
      ],
    },
    { title: "Employees", url: "/Employees" },
    { title: "Services", url: "/Services" },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          style={{ flexGrow: 1 }}
          sx={{
            cursor: "pointer",
          }}
        >
          <Link to="/">Nail Art & Spa LLC.</Link>
        </Typography>
        {navItems.map((item, index) => {
          if (item.url) {
            return (
              <Button key={index} color="inherit">
                <Link
                  to={item.url}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {item.title}
                </Link>
              </Button>
            );
          } else {
            return (
              <div key={index}>
                <Button
                  color="inherit"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  {item.title}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    "& .MuiMenu-paper": {
                      width: anchorEl
                        ? anchorEl.getBoundingClientRect().width
                        : "auto", // Set width to button width
                    },
                  }}
                >
                  {item.subMenu?.map((subItem, index) => {
                    return (
                      <MenuItem onClick={handleClose} key={index}>
                        <Link
                          to={subItem.url}
                          style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          {subItem.title}
                        </Link>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
            );
          }
        })}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
