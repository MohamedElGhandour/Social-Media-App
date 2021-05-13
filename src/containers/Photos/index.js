import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import Photo from "../../components/photo/index";
import { fetchNews, fetchUsers } from "../../store/actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Home() {
  const posts = useSelector((state) => state.posts.news);
  const filteredPosts = posts.filter((post) => post.image !== null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchNews());
  }, [dispatch]);
  const loading = useSelector((state) => state.ui.loading.fetchPosts);
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
          filteredPosts.map((img) => (
            <Photo
              key={img.id}
              userId={img.userId}
              image={img.image}
              name={img.name}
              avatar={img.avatar}
              timestamp={img.timestamp}
            />
          ))
        )}
      </Grid>
    </Grid>
  );
}
