import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Image,
  List,
  Icon,
  Container,
  Grid,
  Menu,
  Dropdown,
  Segment,
  Modal,
  Checkbox
} from "semantic-ui-react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import UserModal from "./UserModal";
import { deleteUser } from '../actions/actionCreators';

const ModalConfirm = (props) => {
  return (
    <Modal size="mini"
      open={props.open}
      closeOnEscape={props.closeOnEscape}
      closeOnDimmerClick={props.closeOnDimmerClick}
      onClose={props.close}>
      <Modal.Header>Delete User</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete the user?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={props.close}>No</Button>
        <Button positive icon='checkmark' labelPosition='right' content='Yes'
          data-id={props.usrId}
          onClick={props.deleteUser} />
      </Modal.Actions>
    </Modal>
  );
}

const ButtonOptions = (props) => {
  return (
    <List.Content floated="right">
      <UserModal option={2} user={props.user}></UserModal>
      <UserModal option={3} user={props.user}></UserModal>
      <Button size="mini" animated="vertical" onClick={props.closeConfigShow(false, false, props.usrId)}>
        <Button.Content hidden>Delete</Button.Content>
        <Button.Content visible style={{ marginRight: 11 }}>
          <Icon name="trash" />
        </Button.Content>
      </Button>
    </List.Content>
  );
}

const ImageAvatar = (props) => {
  return (
    <Image
      avatar
      src={props.img}
      floated="left"
    />
  );
}

const ListItem = (props) => {
  return (
    <List.Item key={props.user.id}>
      <List.Content floated="left">
        <Grid columns='equal' divided>
          <Grid.Row>
            <Grid.Column style={{ width: "50px" }}>
              <Checkbox label="" id={props.user.id.toString()} key={props.user.id.toString()} name={props.user.id.toString()} checked={props.checkedItems.get(props.user.id.toString())} onChange={props.handleCheckedItem}></Checkbox>
            </Grid.Column>
            <Grid.Column style={{ width: "230px" }}>
              <ImageAvatar img={props.user.img}></ImageAvatar>
              <List.Header style={{ textAlign: "left" }}>Name</List.Header>
              <List.Description style={{ textAlign: "left" }}>{props.user.name}</List.Description>
            </Grid.Column>
            <Grid.Column style={{ width: "100px" }}>
              <List.Header style={{ textAlign: "left" }}>Age</List.Header>
              <List.Description style={{ textAlign: "left" }}>{props.user.age}</List.Description>
            </Grid.Column>
            <Grid.Column style={{ width: "200px" }}>
              <List.Header style={{ textAlign: "left" }}>Role</List.Header>
              <List.Description style={{ textAlign: "left" }}>{props.user.role}</List.Description>
            </Grid.Column>
            <Grid.Column style={{ width: "200px" }}>
              <List.Header style={{ textAlign: "left" }}>Email</List.Header>
              <List.Description style={{ textAlign: "left" }}><a href={'mailto:' + props.user.email}>{props.user.email}</a></List.Description>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </List.Content>
      <ButtonOptions
        closeConfigShow={props.closeConfigShow}
        close={props.close}
        usrId={props.user.id}
        user={props.user}
        deleteUser={props.deleteUser}>
      </ButtonOptions>
    </List.Item>
  );
}

class UsersList extends React.Component {
  state = {
    redirect: false,
    open: false,
    usrId: null,
    filter: false,
    usersData: [],
    inputSearchValue: "",
    checkedItems: new Map(),
  }

  static propTypes = {
    users: PropTypes.array,
    getUsers: PropTypes.func,
    deleteUser: PropTypes.func
  }

  static defaultProps = {
    users: []
  }

  styles = { margin: 12, maxHeight: "280px", overflowY: "auto" };

  displayListItem = (users) => {
    let usersData = [];
    if (this.state.filter) {
      usersData = users;
      if (this.state.inputSearchValue) {
        usersData = usersData.filter((i) => {
          return (i.age.toString().indexOf(this.state.inputSearchValue) >= 0 ||
            i.name.toLowerCase().indexOf(this.state.inputSearchValue) >= 0 ||
            i.role.toLowerCase().indexOf(this.state.inputSearchValue) >= 0 ||
            i.email.toLowerCase().indexOf(this.state.inputSearchValue) >= 0)
        });
      }
    }
    else {
      usersData = users;
    }
    return usersData.map((el) => (
      <ListItem
        key={el.id}
        id={el.id}
        user={el}
        close={this.close}
        closeConfigShow={this.closeConfigShow}
        deleteUser={this.deleteUser}
        checkedItems={this.state.checkedItems}
        handleCheckedItem={this.handleCheckedItem} />
    ))
  }

  handleOnClick = () => {
    this.setState({ redirect: true });
  }

  handleSearchClick = () => {
    this.setState({ filter: true });
  }

  handleCheckedItem = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const id = e.target.id;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked, id) }));
  }

  handleOptionChange = (e, { value }) => {
    switch (value) {
      case "delete":
        this.setState({ closeOnEscape: false, closeOnDimmerClick: false, open: true, usrId: 0 });
        break;
      default:
        break;
    }
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick, userId) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true, usrId: userId });
  }

  close = () => this.setState({ open: false })

  deleteUser = (e) => {
    if (this.state.usrId > 0)
      this.props.deleteUser(this.state.usrId);
    else {
      for (let [k, v] of this.state.checkedItems) {
        if (v) {
          this.props.deleteUser(k);
        }
      }
    }
    this.close();
  }

  updateInputSearchValue = (evt) => {
    this.setState({
      inputSearchValue: evt.target.value
    });
    this.setState({ filter: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/create" />;
    }
    const { users } = this.props;
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    const { checkedItems } = this.state;
    let disableOptDelete = true;
    if (checkedItems.size > 0) {
      disableOptDelete = true;
      for (let v of this.state.checkedItems.values()) {
        if (v) {
          disableOptDelete = false;
          break;
        }
      }
    }
    const options = [
      // { key: 'exportPDF', icon: 'file pdf', text: 'Export PDF', value: 'exportpdf' },
      // { key: 'exportXLS', icon: 'file excel', text: 'Export XLS', value: 'exportxls' }
      { key: 'multipleDelete', icon: 'trash', text: 'Multiple Delete', value: 'delete', disabled: disableOptDelete }
    ];
    return (
      <Container>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Button floated='right' icon labelPosition='left' size="small" primary onClick={this.handleOnClick}>
                <Icon name='user' /> Add User
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Menu attached="top">
                <Button.Group style={{ margin: '3px' }} color='teal'>
                  <Button>Actions</Button>
                  <Dropdown
                    className='button icon'
                    options={options}
                    trigger={<React.Fragment />}
                    onChange={this.handleOptionChange}
                  />
                </Button.Group>

                <Menu.Menu position="right">
                  <div className="ui right aligned category search item">
                    <div className="ui transparent icon input">
                      <input
                        className="prompt"
                        type="text"
                        placeholder="Search users..."
                        name="searchInput"
                        value={this.state.inputSearchValue} onChange={this.updateInputSearchValue}
                      />
                      <i className="search link icon" onClick={this.handleSearchClick} />
                    </div>
                    <div className="results" />
                  </div>
                </Menu.Menu>
              </Menu>

              <Segment attached="bottom">
                <List selection divided verticalAlign="middle" style={this.styles}>
                  {this.displayListItem(users)}
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ModalConfirm open={open} closeOnEscape={closeOnEscape} closeOnDimmerClick={closeOnDimmerClick} close={this.close} deleteUser={this.deleteUser}></ModalConfirm>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: (usrId) => {
      dispatch(deleteUser(usrId))
    }
  }
}

export default connect(null, mapDispatchToProps)(UsersList);
