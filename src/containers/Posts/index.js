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
  fetchUser,
  restScrollPage,
} from "../../store/actions/index";
import InfiniteScroll from "react-infinite-scroll-component";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export default function Posts(props) {
  const dispatch = useDispatch();
  const { home, profile, profileId } = props;
  const posts = useSelector((state) => state.posts.posts);
  const loadMore = useSelector((state) => state.posts.loadMore);
  const type = profileId !== undefined ? "profile" : home ? "posts" : "news";
  const toggleLoveFun = (post) => dispatch(toggleLove(post, type));
  useEffect(() => {
    dispatch(restScrollPage());
    dispatch(fetchUsers());
    profileId !== undefined
      ? dispatch(fetchUser(profileId, "post"))
      : home
      ? dispatch(fetchPosts())
      : dispatch(fetchNews());
  }, [dispatch, home, profileId]);
  const loading = useSelector((state) => state.ui.loading.fetchPosts);
  const nextFetchScroll = () =>
    profileId !== undefined
      ? dispatch(fetchUser(profileId, "post"))
      : home
      ? dispatch(fetchPosts())
      : dispatch(fetchNews());

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {profile === undefined ? (
        <PostGen postType={type} />
      ) : profile ? (
        <PostGen postType={type} />
      ) : null}
      {!loading ? (
        posts.length > 0 ? (
          <InfiniteScroll
            dataLength={posts.length}
            next={nextFetchScroll}
            hasMore={loadMore}
            loader={<Post loading />}
            scrollableTarget="underRoot"
            style={{ overflow: "inherit" }}
            endMessage={
              <div
                style={{
                  textAlign: "center",
                  padding: "20px 0",
                  color: "#1878f2",
                  fontWeight: 500,
                }}
              >
                <CheckCircleOutlineIcon style={{ fontSize: 50 }} />
                <p>You're All Caught Up</p>
              </div>
            }
          >
            {posts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                avatar={post.user.avatar}
                pending={post.user.pending}
                image={post.image}
                body={post.body}
                name={post.user.name}
                createdAt={post.createdAt}
                comments={post.comments}
                loves={post.loves}
                toggleLove={toggleLoveFun}
                userId={post.user._id}
              />
            ))}
          </InfiniteScroll>
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
