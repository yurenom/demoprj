import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  Icon
} from "semantic-ui-react";
import UserForm from "./UserForm";
import UserInfo from "./UserInfo";
import { connect } from 'react-redux';
import { updateUser } from '../actions/actionCreators';

class UserModal extends React.Component {
  state = {
    open: false,
    userData: {
      id: "",
      name: "",
      age: "",
      role: "",
      roleValue: "",
      img: "https://www.williams-sonoma.com/wsimgs/rk/images/dp/wcm/201910/0008/img81c.jpg",
      middleName: "",
      lastName: "",
      gender: null,
      month: null,
      day: null,
      year: null,
      email: "",
      mobile: "",
      facebook: "",
      twitter: "",
      about: "",
      avatarImg: "https://react.semantic-ui.com/images/wireframe/image.png"
    }
  }

  static propTypes = {
    user: PropTypes.any,
    option: PropTypes.any
  }

  static defaultProps = {
    user: null,
    option: null
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    const { user, option } = this.props;
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
    if (option === 3) {
      this.handleData(user);
    }
  }

  close = () => this.setState({ open: false });

  handleData = (userData) => {
    this.setState({ userData: userData });
  }

  update = (e) => {
    e.preventDefault();
    this.props.updateUser(this.state.userData);
    this.close();
  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    const { user, option } = this.props;
    return (
      <Modal
        size={option === 3 ? "large" : "mini"}
        open={open}
        closeOnEscape={closeOnEscape}
        closeOnDimmerClick={closeOnDimmerClick}
        onClose={this.close}
        trigger={
          option === 3 ? (
            <Button onClick={this.closeConfigShow(false, true)} size="mini" animated="vertical">
              <Button.Content hidden>Edit</Button.Content>
              <Button.Content visible style={{ marginRight: 11 }}>
                <Icon name="edit" />
              </Button.Content>
            </Button>
          ) : (option === 2 ? (
            <Button onClick={this.closeConfigShow(false, true)} size="mini" animated="vertical">
              <Button.Content hidden>View</Button.Content>
              <Button.Content visible style={{ marginRight: 11 }}>
                <Icon name="eye" />
              </Button.Content>
            </Button>
          ) : null)
        }
      >
        <Modal.Header>{option === 3 ? "Edit User" : "User Info"}</Modal.Header>
        <Modal.Content image scrolling>
          {
            option === 3 ? (
              <UserForm option={option} user={user} onFillData={this.handleData}></UserForm>
            ) : (option === 2 ? (
              <UserInfo user={user}></UserInfo>
            ) : null)
          }
        </Modal.Content>
        {
          (option === 3 || option === 2) && (
            <Modal.Actions>
              <Button onClick={this.close} secondary>{option === 3 ? "Cancel" : "Ok"}</Button>
              {
                option === 3 && (
                  <Button onClick={this.update} primary disabled={!this.state.userData.name || !this.state.userData.age || !this.state.userData.role || !this.state.userData.gender || !this.state.userData.lastName || !this.state.userData.email}>Save</Button>
                )
              }
            </Modal.Actions>
          )
        }
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (usrInfo) => {
      dispatch(updateUser(usrInfo))
    }
  }
}

export default connect(null, mapDispatchToProps)(UserModal);
