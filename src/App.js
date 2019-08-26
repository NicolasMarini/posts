import React, { Component } from "react";
import "./App.css";
import CustomAppBar from "./components/AppBar";
import TabApp from "./components/Tab";
import Grid from "@material-ui/core/Grid";
import PhotoGrid from "./components/PhotoGrid";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 0,
      search: "",
      isFormEmpty: true
    };
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
    const { selectedTab, search } = this.state;
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
            <CustomAppBar
              onSearchChange={this.handlerChange}
              handlerIsFormEmpty={this.handlerIsFormEmpty}
            />
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
            <Route
              exact
              path="/"
              render={() => <PhotoGrid filterBy={search} />}
            />
            <Route path="/posts" render={this.postCondition} />
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
