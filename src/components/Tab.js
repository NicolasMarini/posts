import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "orange"
  },
  container: {
    margin: 20
  },
  tabContainer: {
    position: "fixed",
    bottom: "0",
    width: "100%"
  },
  bold: {
    fontWeight: "bold"
  }
});

class TabApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onTabChange = (event, selectedTab) => {
    const { onTabChange } = this.props;
    onTabChange(selectedTab);
  };

  render() {
    const { classes, selectedTab } = this.props;
    console.log("PROPS:: ", this.props);
    return (
      <Tabs variant="fullWidth" value={selectedTab} onChange={this.onTabChange}>
        <Tab label="Photos" className={classes.bold} component={Link} to="/" />
        <Tab
          label="Posts"
          className={classes.bold}
          component={Link}
          to="/posts"
        />
      </Tabs>
    );
  }
}

export default withStyles(styles)(TabApp);
