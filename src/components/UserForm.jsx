import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Grid,
  Image
} from "semantic-ui-react";
import { connect } from 'react-redux';
import { postUsers } from '../actions/actionCreators';

class UserForm extends React.Component {
  state = {
    userData: {
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
    },
    days: [],
    formError: false,
    createUserError: false
  }

  static propTypes = {
    postUsers: PropTypes.func,
    user: PropTypes.any,
    option: PropTypes.any
  }

  static defaultProps = {
    user: null,
    option: 1
  }

  avatarArr = [
    { key: 1, id: 1, type: "male", value: "http://icons.iconarchive.com/icons/diversity-avatars/avatars/256/cristiano-ronaldo-icon.png" },
    { key: 2, id: 2, type: "male", value: "http://icons.iconarchive.com/icons/diversity-avatars/avatars/256/andy-warhol-icon.png" },
    { key: 3, id: 3, type: "male", value: "http://icons.iconarchive.com/icons/diversity-avatars/avatars/256/dave-grohl-icon.png" },
    { key: 4, id: 4, type: "female", value: "http://icons.iconarchive.com/icons/diversity-avatars/avatars/256/trinity-icon.png" },
    { key: 5, id: 5, type: "female", value: "http://icons.iconarchive.com/icons/diversity-avatars/avatars/256/traditional-japanese-woman-icon.png" },
    { key: 6, id: 6, type: "female", value: "http://icons.iconarchive.com/icons/diversity-avatars/avatars/256/girl-in-ballcap-icon.png" }
  ];

  genderOptions = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" }
  ];

  months = [
    { key: "jan", text: "January", value: 1 },
    { key: "feb", text: "February", value: 2 },
    { key: "mar", text: "March", value: 3 },
    { key: "apr", text: "April", value: 4 },
    { key: "may", text: "May", value: 5 },
    { key: "jun", text: "June", value: 6 },
    { key: "jul", text: "July", value: 7 },
    { key: "aug", text: "August", value: 8 },
    { key: "sep", text: "September", value: 9 },
    { key: "oct", text: "October", value: 10 },
    { key: "nov", text: "November", value: 11 },
    { key: "dec", text: "December", value: 12 }
  ];

  roles = [
    { key: "sd", id: "sd", value: "Software Developer" },
    { key: "bd", id: "bd", value: "Breakfix Developer" },
    { key: "ac", id: "ac", value: "Automation Coordinator" },
    { key: "sa", id: "sa", value: "Software Architect" },
    { key: "nd", id: "nd", value: "Ninja Developer" },
    { key: "cm", id: "cm", value: "Coffee Maker" }
  ];

  handleRadioChange = (e, { value }) => {
    let roleDesc = e.target.textContent;
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        role: roleDesc,
        roleValue: value
      }
    }));
    if (this.props.option === 3)
      this.props.onFillData(this.state.userData);
  }

  handleSelectChange = (e, { value, name }) => {
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }));
    if (this.props.option === 1) {
      if (name === "gender")
        this.selectRandomAvatar(value);
    }
    if (this.props.option === 3)
      this.props.onFillData(this.state.userData);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }));
    if (this.props.option === 3)
      this.props.onFillData(this.state.userData);
  }

  getDaysByMonth = (event, data) => {
    let d = [];
    this.setState({ days: d });
    switch (data.value) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        for (let index = 0; index < 31; index++) {
          d.push({ key: (index + 1), text: (index + 1), value: (index + 1) });
        }
        break;
      case 2:
        for (let index = 0; index < 28; index++) {
          d.push({ key: (index + 1), text: (index + 1), value: (index + 1) });
        }
        break;
      case 4: case 6: case 9: case 11:
        for (let index = 0; index < 30; index++) {
          d.push({ key: (index + 1), text: (index + 1), value: (index + 1) });
        }
        break;
      default:
        break;
    }
    this.setState({ days: d });
    if (event)
      this.handleSelectChange(event, { value: data.value, name: data.name });
  }

  getYears = () => {
    let y = [];
    let dt = new Date();
    for (let index = 1960; index < dt.getFullYear(); index++) {
      y.push({ key: (index), text: (index), value: (index) });
    }
    return y;
  }

  submit = (e) => {
    e.preventDefault();
    this.props.postUsers(this.state.userData);
    this.props.history.push("/users");
  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push("/users");
  }

  selectRandomAvatar = (v) => {
    let maleArr = this.avatarArr.filter((i) => i.type === "male");
    let femaleArr = this.avatarArr.filter((i) => i.type === "female");
    let keysM = Object.keys(maleArr);
    let keysF = Object.keys(femaleArr);
    let itm = null;
    if (v === "male")
      itm = maleArr[keysM[keysM.length * Math.random() << 0]];
    if (v === "female")
      itm = femaleArr[keysF[keysF.length * Math.random() << 0]];
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        avatarImg: itm.value,
        img: itm.value
      }
    }));
  }

  componentDidMount() {
    const { user, option } = this.props;
    if (option === 3) {
      this.getDaysByMonth(null, { value: user.month });
      this.setDataToEdit(user);
    }
  }

  setDataToEdit = (objData) => {
    const keys = Object.keys(objData);
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      this.setState(prevState => ({
        userData: {
          ...prevState.userData,
          [element]: objData[element]
        }
      }));
      if (element === "role") {
        let r = this.roles.filter((i) => i.value === objData[element]);
        this.setState(prevState => ({
          userData: {
            ...prevState.userData,
            roleValue: r[0].id
          }
        }));
      }
      if (element === "img") {
        this.setState(prevState => ({
          userData: {
            ...prevState.userData,
            avatarImg: objData[element]
          }
        }));
      }
    }
  }

  render() {
    const { roleValue } = this.state.userData;
    const { option } = this.props;

    return (
      <Grid columns={2}>
        <Grid.Row style={{ width: "100%" }}>
          <Grid.Column style={{ width: "30%" }}>
            <Image
              size="medium"
              src={this.state.userData.avatarImg}
              wrapped
            />
          </Grid.Column>
          <Grid.Column style={{ width: "70%" }}>
            <Form size="small">
              <Form.Group>
                <Form.Input
                  fluid
                  label="First name"
                  placeholder="First name"
                  width={10}
                  name="name" value={this.state.userData.name} onChange={this.handleInputChange}
                  required
                />
                <Form.Input
                  fluid
                  label="Middle name"
                  placeholder="Middle name"
                  width={10}
                  name="middleName" value={this.state.userData.middleName} onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  label="Last name"
                  placeholder="Last name"
                  width={10}
                  name="lastName" value={this.state.userData.lastName} onChange={this.handleInputChange}
                  required
                />
                <Form.Select
                  fluid
                  label="Gender"
                  options={this.genderOptions}
                  placeholder="Gender"
                  name="gender" value={this.state.userData.gender} onChange={this.handleSelectChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Select
                  fluid
                  search
                  label="Birth Date"
                  options={this.months}
                  placeholder="Month"
                  name="month" value={this.state.userData.month} onChange={this.getDaysByMonth}
                  width={4}
                />
                <Form.Select
                  fluid
                  search
                  label="&nbsp;"
                  options={this.state.days}
                  placeholder="Day"
                  width={2}
                  name="day" value={this.state.userData.day} onChange={this.handleSelectChange}
                />
                <Form.Select
                  fluid
                  search
                  label="&nbsp;"
                  options={this.getYears()}
                  placeholder="Year"
                  width={3}
                  name="year" value={this.state.userData.year} onChange={this.handleSelectChange}
                />
                <Form.Input
                  label="Age"
                  type="number"
                  min={15}
                  max={45}
                  placeholder="Age"
                  name="age" value={this.state.userData.age} onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  fluid
                  label="Mobile number"
                  placeholder="Mobile number"
                  width={10}
                  name="mobile" value={this.state.userData.mobile} onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  label="E-mail"
                  placeholder="E-mail"
                  width={10}
                  name="email" value={this.state.userData.email} onChange={this.handleInputChange}
                  required
                />
                <Form.Input
                  fluid
                  label="Facebook"
                  placeholder="Facebook"
                  width={10}
                  name="facebook" value={this.state.userData.facebook} onChange={this.handleInputChange}
                />
                <Form.Input
                  fluid
                  label="Twitter"
                  placeholder="Twitter"
                  width={10}
                  name="twitter" value={this.state.userData.twitter} onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group inline>
                <label style={{ marginRight: 2 }}>Role</label>
                <label style={{ color: "red" }}>*</label>
                {
                  this.roles.map((el) => (
                    <Form.Radio
                      key={el.key}
                      label={el.value}
                      value={el.key}
                      checked={roleValue === el.key}
                      onChange={this.handleRadioChange}
                    />
                  ))
                }
              </Form.Group>
              <Form.TextArea
                label="About User"
                placeholder="Tell us more about user..."
                name="about" value={this.state.userData.about} onChange={this.handleInputChange}
              />
              {
                option === 1 && (
                  <React.Fragment>
                    <Button floated='right' type='submit' onClick={this.submit} primary disabled={!this.state.userData.name || !this.state.userData.age || !this.state.userData.role || !this.state.userData.gender || !this.state.userData.lastName || !this.state.userData.email}>Save</Button>
                    <Button floated='right' onClick={this.cancel} secondary>Cancel</Button>
                  </React.Fragment>
                )
              }
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postUsers: (usrInfo) => {
      dispatch(postUsers(usrInfo))
    }
  }
}

export default connect(null, mapDispatchToProps)(UserForm);
