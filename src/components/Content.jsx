import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { connect } from 'react-redux';
import UsersList from "./UsersList";
import UserForm from "./UserForm";
import { getUsers } from '../actions/actionCreators';

class Content extends React.Component {
  state = {};

  static propTypes = {
    users: PropTypes.array
  };

  static defaultProps = {
    users: []
  };

  componentDidMount() {
    this.props.getUsers();
  }

  styles = {
    marginTop: "4em",
    flex: 1
  };

  render() {
    return (
      <React.Fragment>
        <Container style={this.styles}>
          <Switch>
            <Route exact path="/users" render={() => <UsersList users={this.props.users} />} />
            <Route exact path="/create" component={UserForm} />
            <Route
              exact
              path="/home"
              render={() => {
                return (<h1>WELCOME</h1>);
              }}
            />
            <Route
              exact
              path="/not-found"
              render={() => {
                return (<h1>Not Found</h1>);
              }}
            />
            <Redirect from="/" to="/users" />
            <Redirect from="*" to="/not-found" />
          </Switch>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.mainReducer.users
})

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(getUsers())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));
