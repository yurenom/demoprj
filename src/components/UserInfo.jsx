import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  List,
  Image
} from "semantic-ui-react";

class UserInfo extends React.Component {
  state = {}

  static propTypes = {
    user: PropTypes.any
  }

  static defaultProps = {
    user: null
  }

  render() {
    const { user } = this.props;
    const extra = (
      <List>
        <List.Item>
          <List.Icon name='birthday' />
          <List.Content>{user.age + ' years old'}</List.Content>
        </List.Item>
        {
          (user.email !== "" && !!user.email) && (
            <List.Item>
              <List.Icon name='mail' />
              <List.Content>
                <a href={'mailto:' + user.email}>{user.email}</a>
              </List.Content>
            </List.Item>
          )
        }
        {
          (user.mobile !== "" && !!user.mobile) && (
            <List.Item>
              <List.Icon name='mobile alternate' />
              <List.Content>{user.mobile}</List.Content>
            </List.Item>
          )
        }
      </List>
    )
    return (
      <Card>
        <div style={{ verticalAlign: "middle", textAlign: "-webkit-center" }}>
          <Image src={user.img} style={{ width: "128px", height: "128px" }} />
        </div>
        <Card.Content>
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>
            <span>{user.role}</span>
          </Card.Meta>
          {
            (user.about !== "" && !!user.about) && (
              <Card.Description>
                {user.name + ' ' + user.about}
              </Card.Description>
            )
          }
        </Card.Content>
        <Card.Content extra>
          {extra}
        </Card.Content>
      </Card>
    );
  }
}

export default UserInfo;
