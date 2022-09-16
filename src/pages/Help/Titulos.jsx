import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export default function Titulos(){ 
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <Typography variant="h5">
        ¿Como Usar la pagina web?
        </Typography>
      </Grid>
      <Grid >
      <Typography  color="text.secondary">      
      A continuacion te daremos una leve explicacion 
        para que uses a tu comodidad este sitio
        </Typography>
      </Grid>
    </Grid>
  );
}
