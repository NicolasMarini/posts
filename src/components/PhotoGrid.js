import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PhotoItemPreview from "./PhotoItemPreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchPhotos } from "../services/photoServices";
import withFetch from "./hocs/WithFetch";


const styles = theme => ({ progress: {} });

class PostGrid extends React.Component {
  state = {
    photos: [],
    //isLoading: false
  };

 /* async componentDidMount() {
    //this.setState({ isLoading: true });
    const photos = await this.getPhotos();
    this.setState({
      photos,
      //isLoading: false
    });
  }


  getPhotos = async () => {
    const data = await fetch()
    return data;
  }
  */

  render() {
    const { classes, filterBy, isLoading, data } = this.props;
    //const { isLoading } = this.state;
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
      <Grid container spacing={24} justify="center">
      {data.length > 0
        ? data
            .slice(0, 20)
            .filter(result => {
              return result.title.includes(filterBy);
            })
            .map(photo => (
              <Grid item xs={3} key={photo.id}>
                <PhotoItemPreview {...photo} />
              </Grid>
            ))
        : null}
    </Grid>
    );
  }
}

export default withFetch(withStyles(styles)(PostGrid))('https://jsonplaceholder.typicode.com/photos')

