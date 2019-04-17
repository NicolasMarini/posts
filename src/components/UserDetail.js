import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withRouter } from "react-router";
import { flow } from "lodash";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  table: {
    width: "90%"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    repos: []
  };

  async componentDidMount() {
    const repos = await this.getRepos();
    await this.setState({ repos });
  }

  async getRepos() {
    const { id } = this.props.match.params;
    const response = await fetch(`https://api.github.com/users/${id}/repos`);
    const data = await response.json();
    return data;
  }

  render() {
    const { classes } = this.props;
    const { repos } = this.state;

    if (repos.message && repos.message === "Not Found") {
      return <p>User Not Found</p>;
    }
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Repo ID</CustomTableCell>
            <CustomTableCell>Repo Full Name</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repos.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell>{row.id}</CustomTableCell>
              <CustomTableCell component="th" scope="row">
                {row.full_name}
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default flow(
  withRouter,
  withStyles(styles)
)(UserDetail);
