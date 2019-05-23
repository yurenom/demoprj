import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const MenuItem = (props) => {
  return (
    <Menu.Item
      name={props.name}
      as={Link}
      to={props.to}
    >
      {props.optName}
    </Menu.Item>
  );
}

class Header extends React.Component {
  styles = {
    backgroundColor: "#343a40"
  };
  render() {
    return (
      <Menu fixed="top" inverted style={this.styles}>
        <MenuItem name="home" optName="Home" to="/home"></MenuItem>
        <MenuItem name="users" optName="Users" to="/users"></MenuItem>
      </Menu>
    );
  }
}

export default withRouter(Header);
