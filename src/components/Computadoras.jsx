import React from 'react';
import {Fragment} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';


const tiers = [
    {
      title: 'RAM',
      price: '450',
      description: [
        'Datos',
        'De la base',
        'sacar alguno',
        'aca empleamos arboles',
      ],
      buttonText: 'añadir',
      buttonVariant: 'outlined',
    },
    {
      title: 'Grafica',
      subheader: 'por si quiero',
      price: '1552',
      description: [
        'Lo mismo',
        'Pensar en como hacerlo',
        'Pero estrucura',
      ],
      buttonText: 'por si quiero que un boton sea especial',
      buttonVariant: 'contained',
    },
    {
      title: 'Board',
      price: '3594',
      description: [
        'cuantas veces',
        'sea necesario',
        'estan mapeados',
        'para repetirse',
        'si hay mucha diferencia',
        ' toca pensar '
      ],
      buttonText: 'compra',
      buttonVariant: 'outlined',
    },
  ];


export default function Computadoras(){
    return (
        <Fragment>
          <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
          <CssBaseline />

          <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier) => (
                <Grid
                  item
                  key={tier.title}
                  xs={12}
                  sm={tier.title === 'Enterprise' ? 12 : 6}
                  md={4}
                >
                  <Card>
                    <CardHeader
                      title={tier.title}
                      subheader={tier.subheader}
                      titleTypographyProps={{ align: 'center' }}
                      action={tier.title === 'Pro' ? <StarIcon /> : null}
                      subheaderTypographyProps={{
                        align: 'center',
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'baseline',
                          mb: 2,
                        }}
                      >
                        <Typography component="h2" variant="h3" color="text.primary">
                          ${tier.price}
                        </Typography>
                        
                      </Box>
                      <ul>
                        {tier.description.map((line) => (
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={line}
                          >
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant={tier.buttonVariant}>
                        {tier.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Fragment>
      );
    
}