import React, { Component } from "react";

export class GoogleAuth extends Component {
  state = {
    isSignedIn: null,
  };

  componentDidMount() {
    // Loading OAuth library
    window.gapi.load("client:auth2", () => {
      // Initialize OAuth library
      window.gapi.client
        .init({
          clientId: "ADD OAth2.0 CLIENT ID HERE",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        });
    });
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>I don't know if we're signed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>I'm signed in</div>;
    } else {
      return <div>I'm not signed in</div>;
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
