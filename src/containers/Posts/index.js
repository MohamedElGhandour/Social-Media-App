import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PostGen from "./Generator/index";
import Post from "../../components/Posts/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, toggleLove, fetchUsers } from "../../store/actions/index";

export default function Posts(props) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const toggleLoveFun = (post) => dispatch(toggleLove(post));
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <PostGen />
      {/* <Post loading /> */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            global={post}
            key={post.id}
            id={post.id}
            avatar={post.avatar}
            image={post.image}
            body={post.body}
            name={post.name}
            timestamp={post.timestamp}
            comments={post.comments}
            loves={post.loves}
            toggleLove={toggleLoveFun}
            userId={post.userId}
          />
        ))
      ) : (
        <React.Fragment>
          <Post loading />
          <Post loading />
          <Post loading />
        </React.Fragment>
      )}
    </Grid>
  );
}
