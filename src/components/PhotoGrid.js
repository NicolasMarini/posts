import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PhotoItemPreview from "./PhotoItemPreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Subscribe } from "unstated";
import SearchContainer from "./SearchContainer";
import { flow } from "lodash";
import { withRouter } from "react-router";

const styles = theme => ({ progress: {} });

class PostGrid extends React.Component {
  state = {
    photos: [],
    isLoading: false
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const photos = await this.getPhotos();
    this.setState({
      photos,
      isLoading: false
    });
  }

  async getPhotos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await response.json();
    return data;
  }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;
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
          <CircularProgress
            size={50}
            color="secondary"
            className={classes.progress}
          />
        </div>
      );
    }
    return (
      <Subscribe to={[SearchContainer]}>
        {searchContainer => (
          <Grid container spacing={24} justify="center">
            {this.state
              ? this.state.photos
                  .slice(0, 20)
                  .filter(result => {
                    return result.title.includes(searchContainer.state.search);
                  })
                  .map(photo => (
                    <Grid item xs={3} key={photo.id}>
                      <PhotoItemPreview {...photo} />
                    </Grid>
                  ))
              : null}
          </Grid>
        )}
      </Subscribe>
    );
  }
}

export default flow(
  withRouter,
  withStyles(styles)
)(PostGrid);
