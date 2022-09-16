import React from 'react';
import {Fragment} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
const footers = [
    {title: 'UNIVERSIDAD NACIONAL DE COLOMBIA',
    description:['Bogota. Colombia',"Estructuras de Datos"]}
    ,
    {
      title: 'DESCUBRE EL "EQUIPO"',
      description: [
        'Nelson Steven Rodríguez ',
        'David Alfonso Cañas '
      ],
    },
    {
      title: 'CONTACTANOS',
      description: ['nerodriguezo@unal.edu.co', 'dcanasp@unal.edu.co'],
    }
    
  ];
  const Footer = () => {
    return (
        <Fragment>
          <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />

          <Container
            maxWidth="md"
            component="footer"
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              mt: 8,
              py: [3, 6],
            }}
          >
           
            <Grid container spacing={4} justifyContent="space-evenly">
       
              {footers.map((footer) => (
                
                <Grid item xs={6} sm={3} key={footer.title}>
     <Typography variant="h6" color="text.primary" gutterBottom>
                    {footer.title}
                  </Typography>      
                  <ul>
                    {footer.description.map((item) => (
                      <li key={item}>     
                          {item}
                      </li>
                    ))}
                  </ul>
                </Grid>
              ))}
            </Grid>
          </Container>
          {/* End footer */}
        </Fragment>
      );

}

export default Footer;