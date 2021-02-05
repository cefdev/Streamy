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
          // To update the rendered message in the UI without refreshing the page
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  // To sign in
  onSignIn = () => {
    this.auth.signIn();
  };

  // To sign out
  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui blue google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
