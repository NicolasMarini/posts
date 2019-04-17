import React, { Component } from "react";
import "./App.css";
import CustomAppBar from "./components/AppBar";
import TabApp from "./components/Tab";
import Grid from "@material-ui/core/Grid";
import PhotoGrid from "./components/PhotoGrid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Subscribe } from "unstated";
import SearchContainer from "./components/SearchContainer";
import UserGrid from "./components/UserGrid";
import UserDetail from "./components/UserDetail";
import NotFound from "./components/NotFound";

const tabs = [
  {
    index: 0,
    path: "/"
  },
  {
    index: 1,
    path: "/users"
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: tabs
        .reverse()
        .find(tab => window.location.pathname.includes(tab.path)).index,
      search: "",
      isFormEmpty: true
    };
  }

  componentDidMount() {
    console.log("state> ", this.state.selectedTab);
  }
  handlerChange = value => {
    this.setState({ search: value });
  };

  onTabChange = selectedTab => {
    this.setState({ selectedTab });
  };

  handlerIsFormEmpty = isFormEmpty => {
    this.setState({ isFormEmpty });
  };

  postCondition = () => {
    const { isFormEmpty } = this.state;
    if (!isFormEmpty) {
      alert("this is a message", isFormEmpty);
    }
    return <div>Posts</div>;
  };

  render() {
    const { selectedTab } = this.state;
    return (
      <Router>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          style={{
            height: "100vh"
          }}
        >
          <Grid item>
            <Subscribe to={[SearchContainer]}>
              {searchContainer => (
                <CustomAppBar
                  onSearchChange={searchContainer.handlerChange}
                  handlerIsFormEmpty={this.handlerIsFormEmpty}
                />
              )}
            </Subscribe>
          </Grid>
          <Grid
            item
            style={{
              overflow: "auto",
              flex: 1,
              width: "100%",
              padding: "12px"
            }}
          >
            <Switch>
              <Route exact path="/" render={() => <PhotoGrid />} />
              <Route exact path="/users" render={() => <UserGrid />} />
              <Route exact path="/users/:id" component={UserDetail} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Grid>
          <Grid item style={{ backgroundColor: "#1B9AAA", color: "white" }}>
            <TabApp selectedTab={selectedTab} onTabChange={this.onTabChange} />
          </Grid>
        </Grid>
      </Router>
    );
  }
}

export default App;
