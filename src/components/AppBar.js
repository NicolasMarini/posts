import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";

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

  render() {
    const { onSearchChange } = this.props;

    const initialValues = { search: "" };
    return (
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            App
          </Typography>
          <div style={{ flex: 1 }} />
          <Formik
            validate={this.searchValidate}
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              onSearchChange(values.search);
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
                    inputProps={{
                      "data-test": "test-input"
                    }}
                  />
                  <Button type="submit">Search</Button>
                </form>
              );
            }}
          </Formik>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);
