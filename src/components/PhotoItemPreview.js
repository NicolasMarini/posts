import React from "react";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = {
  media: {
    height: 140
  }
};

class PostItemPreview extends React.Component {
  render() {
    const { classes, thumbnailUrl, title } = this.props;

    return (
      <div style={{ height: "100%" }}>
        <Card style={{ height: "100%" }}>
          <CardMedia
            className={classes.media}
            image={thumbnailUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography noWrap gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PostItemPreview);
