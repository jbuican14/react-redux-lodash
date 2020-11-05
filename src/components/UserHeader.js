import React from "react";
import { connect } from "react-redux";
// import { fetchUser } from "../actions"; ~~~~ method 2 ~~~~~

class UserHeader extends React.Component {
  // ~~~~~ method 2 fetch ~~~~~
  // componentDidMount() {
  //   this.props.fetchUser(this.props.userId);
  // }
  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return <div className="header"> {user.name}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find((user) => user.id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);

// ~~~~~ method 2 fetch ~~~~~
// export default connect(mapStateToProps, { fetchUser })(UserHeader);
