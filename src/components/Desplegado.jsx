import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// todo esto toca pensarlo y no tiene que estar aqui
async function pedirDatos(atributo){
    
    console.log(atributo);

    let url = 'http://localhost:8080/';
    url = url + atributo[0];
    fetch(url);//.then((response) => response.json()).then((constante) => console.log(prueba));
    console.log(url);
  }

const componentes = [
  'ALM_tipo',
  'ALM_capacidad',
  'ALM_velLectura',
  'ALM_velEscritura',
  'ALM_marca',
  'ALM_precio',
  'ALM_nombre',
];


export default function MultipleSelect() {
  const[select, setSelect]=React.useState([]); 

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelect(value);
    
    const arbolesTraidos = pedirDatos(select);
    
};

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={select}
          onChange={handleChange}
          // onChange={props.handle} //vaya a la funcion del padre, lifting state
          input={<OutlinedInput label="Name" />}
        >
          {componentes.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
