import React from "react";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import Photo from "./photo/index";

export default function Home() {
  const posts = useSelector((state) => state.posts.posts);
  const filteredPosts = posts.filter((post) => post.image !== null);
  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid item xs={12} style={{ padding: "0 16px", marginTop: 32 }}>
        {filteredPosts.map((img) => (
          <Photo
            key={img.id}
            userId={img.userId}
            image={img.image}
            name={img.name}
            avatar={img.avatar}
          />
        ))}
      </Grid>
    </Grid>
  );
}
