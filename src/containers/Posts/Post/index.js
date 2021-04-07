import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CommentGenerator from "../../Comments/Generator/index";
import Avatar from "../../../components/UI/Avatar/index";
import PostGen from "../Generator/index";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
  btn: {
    textAlign: "center",
    width: "50%",
    color: "#69676b",
    textTransform: "capitalize",
  },
  btnGroup: {
    borderTop: "1px solid #ced0d4",
    borderBottom: "1px solid #ced0d4",
    margin: "16px",
    padding: "5px 0",
    width: "auto",
  },
}));

function Media(props) {
  const { loading = false } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          ) : (
            <Avatar />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            "Ted"
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            "5 hours ago"
          )
        }
      />
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            {
              "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
            }
          </Typography>
        )}
      </CardContent>
      {loading ? (
        <Skeleton
          animation="wave"
          variant="rect"
          style={{ marginBottom: 6 }}
          className={classes.media}
        />
      ) : (
        <CardMedia
          className={classes.media}
          image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          title="Ted talk"
        />
      )}
      {loading ? (
        <CardContent>
          <Skeleton
            animation="wave"
            height={10}
            style={{
              marginBottom: 6,
            }}
            width="100%"
          />
        </CardContent>
      ) : (
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.btnGroup}
        >
          <Button className={classes.btn}>Like</Button>
          <Button className={classes.btn}>Comment</Button>
        </Grid>
      )}
      {loading ? null : <CommentGenerator />}
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Post() {
  return (
    <div>
      <PostGen />
      <Media />
    </div>
  );
}
