import React from "react";
import { Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Desplegado from "../../components/Desplegado";


const SearchBar = () => {
  return (
    <div>
    <Grid container spacing={2}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        item
        xs={12}
        md={12}
        style={{ height: "300px" }}
      >
        <Grid item>
        <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      {/* <TextField fullWidth label="Compara componentes" id="fullWidth" /> */}
      <Desplegado></Desplegado>
      <Desplegado></Desplegado>
      {/* TODO AQUI ESTA EL CAMBIO PARA MOSTRAR LA IDEA */}
    </Box>
        </Grid>
      </Grid>
      </Grid>

    </div>
  );
};

export default SearchBar;