import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { Subscribe } from "unstated";
import SearchContainer from "./SearchContainer";
import { withRouter } from "react-router";

const styles = {};

class CustomAppBar extends React.Component {
  searchValidate = values => {
    const { handlerIsFormEmpty } = this.props;
    if (!values.search) {
      handlerIsFormEmpty(true);
    } else {
      handlerIsFormEmpty(false);
    }
  };

  buildPath = searchValue => {
    this.props.history.push({
      pathname: this.props.location.path,
      search: `?q=${searchValue}+in:login`
    });
  };

  render() {
    //const { onSearchChange } = this.props;

    const initialValues = { search: "" };
    return (
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            App
          </Typography>
          <div style={{ flex: 1 }} />
          <Subscribe to={[SearchContainer]}>
            {searchContainer => (
              <Formik
                validate={this.searchValidate}
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                  this.buildPath(values.search);
                  searchContainer.handlerChange(
                    values.search,
                    this.props.history
                  );
                  resetForm(initialValues);
                }}
              >
                {({ values, handleSubmit, handleChange }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Input
                        name="search"
                        value={values.search}
                        onChange={handleChange}
                        placeholder="Search"
                        autoComplete="off"
                      />
                      <Button type="submit">Search</Button>
                    </form>
                  );
                }}
              </Formik>
            )}
          </Subscribe>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(CustomAppBar));
