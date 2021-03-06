import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "./actions/index";

export class GoogleAuth extends Component {
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
          // Assign the authentication instance to 'auth' variable
          this.auth = window.gapi.auth2.getAuthInstance();

          // Update our auth state inside redux store
          this.onAuthChange(this.auth.isSignedIn.get());

          // To update the rendered message in the UI without refreshing the page
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    isSignedIn
      ? this.props.signIn(this.auth.currentUser.get().getId())
      : this.props.signOut();
  };

  // To sign in
  onSignInClick = () => {
    this.auth.signIn();
  };

  // To sign out
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
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

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
