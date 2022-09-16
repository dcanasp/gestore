import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export default function Ayudas (){ 
    return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <Typography variant="h5">
        1. Escribe el primer periferico que deseas comparar y clickea cuando aparezca el nombre desplegado. haz lo mismo la cantidad de veces queridas
        </Typography>
      </Grid>
      <Grid >
      <Grid item>
        <Typography variant="h5">
        2. Te apareceran de la siguiente forma los perifericos seleccionados. Ahora dale al boton "Comparar" y listo!
        </Typography>
      </Grid>
      <Typography  color="text.secondary">      
     Esto puede demorar un tiempo, ya que se estan sacando los datos en tiempo real de la base de datos
        </Typography>
      </Grid>
    </Grid>
  );
}
