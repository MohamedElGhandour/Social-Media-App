import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CommentGenerator from "../../containers/Comments/Generator/index";
import Comment from "../../containers/Comments/index";
import Avatar from "../../components/UI/Avatar/index";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 680,
    width: "100%",
    margin: "16px auto",
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

export default function Post(props) {
  const { loading = false } = props;
  const preventDefault = (event) => event.preventDefault();
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
            <Avatar avatar={props.avatar} />
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
            <Typography
              variant="body1"
              style={{ color: "#000", fontWeight: "bold" }}
              component="p"
            >
              <Link href="#" onClick={preventDefault}>
                {props.username}
              </Link>
            </Typography>
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            new Date(props.timestamp).toUTCString()
          )
        }
      />
      <CardContent style={{ paddingTop: 0 }}>
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
          <Typography
            variant="body2"
            style={{ color: "#0C050C" }}
            component="p"
          >
            {props.body}
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
      ) : props.image ? (
        <img
          src={props.image}
          style={{ cursor: "pointer" }}
          alt="img"
          width="100%"
        />
      ) : null}
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
      {loading ? null : (
        <CommentGenerator
          global={props.global}
          comments={props.comments}
          avatar={props.avatar}
          author={props.author}
        />
      )}
      {loading
        ? null
        : props.comments.map((comment) => (
            <Comment
              avatar={comment.avatar}
              body={comment.body}
              key={comment.id}
              author={comment.author}
            />
          ))}
    </Card>
  );
}

Post.propTypes = {
  loading: PropTypes.bool,
};
