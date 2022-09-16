import React from "react";
import { Grid, Typography } from "@mui/material";
import BigCard from "./BigCard";
import MediumCard from "./MediumCard";

const BetterComponents = () => {
  return (
    <Grid container spacing={2}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        item
        xs={12}
        md={6}
        style={{ height: "700px" }}
      >
        <Grid item>
          < BigCard/>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={6}
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        style={{ height: "700px" }}
      >
      </Grid>
    </Grid>
  );
};

export default BetterComponents;