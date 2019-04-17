import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Subscribe } from "unstated";
import SearchContainer from "./SearchContainer";
import { withRouter } from "react-router";

class UserGrid extends React.Component {
  state = {
    users: [],
    isLoading: false
  };

  async componentDidMount() {
    //this.setState({ isLoading: true });
    //let users = await this.getUsers();
    //await this.setState({ users, isLoading: false });
  }

  /*
  async getUsers() {
    const response = await fetch("https://api.github.com/users?since=135");
    const data = await response.json();
    return data;
  }
*/
  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
          }}
        >
          <CircularProgress size={50} color="secondary" />
        </div>
      );
    }
    return (
      <Grid container spacing={24} justify="center">
        <Subscribe to={[SearchContainer]}>
          {searchContainer =>
            searchContainer.state.users.map(user => {
              return (
                <Grid item xs={3} sm={2} key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    <img
                      src={user.avatar_url}
                      style={{ width: "65px", height: "65px" }}
                    />
                    <p>{user.login}</p>
                  </Link>
                </Grid>
              );
            })
          }
        </Subscribe>
      </Grid>
    );
  }
}

export default withRouter(UserGrid);
