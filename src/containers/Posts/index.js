import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import PostGen from "./Generator/index";
import Post from "../../components/Posts/index";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  toggleLove,
  fetchUsers,
  fetchNews,
  fetchProfile,
} from "../../store/actions/index";

export default function Posts(props) {
  const dispatch = useDispatch();
  const { home, profile, profileId } = props;
  const posts = useSelector((state) =>
    profileId !== undefined
      ? state.posts.profile
      : home
      ? state.posts.posts
      : state.posts.news
  );
  const type = profileId !== undefined ? "profile" : home ? "posts" : "news";
  const toggleLoveFun = (post) => dispatch(toggleLove(post, type));
  useEffect(() => {
    dispatch(fetchUsers());
    profileId !== undefined
      ? dispatch(fetchProfile(profileId))
      : home
      ? dispatch(fetchPosts())
      : dispatch(fetchNews());
  }, [dispatch, home, profileId]);
  const loading = useSelector((state) => state.ui.loading.fetchPosts);
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {profile === undefined ? (
        <PostGen postType={type} />
      ) : profile ? (
        <PostGen postType={type} />
      ) : null}
      {!loading ? (
        posts.length > 0 ? (
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
              commentsType={type}
            />
          ))
        ) : (
          <div style={{ color: "#a1aebe" }}>
            make some friends and share with us what you love
          </div>
        )
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
