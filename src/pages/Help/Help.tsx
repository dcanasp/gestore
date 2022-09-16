import Computadoras from "../../components/Computadoras";
import Titulos from "./Titulos";
import Ayudas from "./Ayudas";
import Grid from '@mui/material/Grid';



export default function Help (){
return(
    <div>
<Titulos></Titulos>

<Grid container spacing={2}>
  <Grid item xs={6}>
  </Grid>
  <Grid item xs={6}>
  <Ayudas ></Ayudas>
  </Grid>
  <Grid item xs={6}>

  </Grid>
  <Grid item xs={6}>
    {/*    */}
  </Grid>
</Grid>  
<Computadoras/>
    </div>
);
};
