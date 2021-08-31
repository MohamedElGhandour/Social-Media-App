import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import Photo from "../../components/photo/index";
import {
  fetchImages,
  fetchUsers,
  restScrollPage,
} from "../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export default function Home() {
  const posts = useSelector((state) => state.posts.images);
  const dispatch = useDispatch();
  const loadMore = useSelector((state) => state.posts.loadMore);
  useEffect(() => {
    dispatch(restScrollPage());
    dispatch(fetchUsers());
    dispatch(fetchImages());
  }, [dispatch]);
  const loading = useSelector((state) => state.ui.loading.fetchPosts);
  const nextFetchScroll = () => dispatch(fetchImages());
  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid item xs={12} style={{ padding: "0 16px", marginTop: 32 }}>
        {loading ? (
          <CircularProgress
            style={{
              color: "#1878f2",
              margin: "auto",
              display: "block",
              marginTop: 100,
            }}
          />
        ) : (
          <InfiniteScroll
            dataLength={posts.length}
            next={nextFetchScroll}
            hasMore={loadMore}
            loader={
              <CircularProgress
                style={{
                  color: "#1878f2",
                  margin: "auto",
                  display: "block",
                  marginTop: 100,
                }}
              />
            }
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
            {posts.map((img) => (
              <Photo
                key={img._id}
                userId={img.user._id}
                pending={img.user.pending}
                image={img.image}
                name={img.user.name}
                avatar={img.user.avatar}
                timestamp={img.createdAt}
              />
            ))}
          </InfiniteScroll>
        )}
      </Grid>
    </Grid>
  );
}
