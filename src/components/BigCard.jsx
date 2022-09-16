import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from 'react-bootstrap/esm/Button';
import Typography from '@mui/material/Typography';

async function pedirDatos(){
  console.log("entro");
  
  fetch("http://localhost:8080/ALM_capcidada");//.thenx((response) => response.json()).then((dog) => console.log(dog));

}

export default function BigCard() {

  return (
    <Card sx={{ width: 600,height:600 }}>
      <CardMedia
        component="img"
        alt="Intel i9"
        image="https://m.media-amazon.com/images/I/81A3penuVOL._AC_SX679_.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Intel Core i9-12900K
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Intel Core i9-12900K Procesador de escritorio 16 (8P+8E) núcleos de hasta 5,2 GHz desbloqueado LGA1700 serie 600 chipset 125W
        </Typography>
      </CardContent>
      <CardActions>
    <center>
      <Button  onClick={pedirDatos} variant="primary">Comprar</Button>
      </center>
      </CardActions>
    </Card>
  );
}