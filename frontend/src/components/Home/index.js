import React, { Component } from "react";
import { Input, Button, Card, Container, Row } from "antd";
import { inject, observer } from "mobx-react";

class Home extends Component {
  render() {
    let {
      userStore: { getUserData }
    } = this.props;
    return (
      <div>
        {/* <h1>{welcomeMessage}</h1>
        <Card style={{ width: "50%", alignSelf: "center" }}>
          <Input
            placeholder="Enter Name"
            onChange={value => {
              changeMessage(value);
            }}
            value={welcomeMessage === "Welcome!" ? "" : welcomeMessage}
          /> */}
        <Button
          onClick={() => {
            getUserData();
          }}
        >
          Click Me!
        </Button>
        {/* </Card> */}
      </div>
    );
  }
}

export default inject("userStore")(observer(Home));
