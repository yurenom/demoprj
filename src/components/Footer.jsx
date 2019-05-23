import React from "react";
import { Segment, Container } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Footer extends React.Component {
  state = {};
  styles = {
    backgroundColor: "#343a40",
    borderRadius: 0
  };
  render() {
    return (
      <Segment fixed="bottom" inverted style={this.styles}>
        <Container textAlign="left">© Company 2019</Container>
      </Segment>
    );
  }
}

export default withRouter(Footer);
