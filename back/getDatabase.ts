//npm install @prisma/client 
//npx prisma db pull
//npx prisma generate //el que hace que se actualicen las dependencias , despues de un pull
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {

  const allUsers = await prisma.usuario.findMany({ //select * from prisma.TABLE where user_id=1
      where: {
        user_id:1
      },

  })
  console.dir(allUsers, { depth: null })

  //const allUsers = await prisma.usuario.findMany() //select * from prisma.TABLE... 
  //console.log(allUsers)


}

/*
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
*/

  export const getUser = async (req:any) =>{
    try {
      const allUsers = await prisma.usuario.findMany({ //select * from prisma.TABLE where user_id=1
        where: {
          username: req.username
        },

    })
    try {

    if(req.password==allUsers[0].password){
      console.log("si");
      return true;
    }
    console.log("clave incorecta");
    return false;
  }
  catch(e:any) {
    console.log("usuario not found");
    return false;
  }
    
  }
  catch (e:any) {//no se pudo conectar a base de datos
    console.error(e);
    await prisma.$disconnect();
    //process.exit(1);
  };
}

export const getProducts =async () => { //TODO: no le pongaany a todo
  try {
    const allProducts = await prisma.producto.findMany({ //select * from prisma.TABLE where user_id=1
    })
    return allProducts;
  }
  catch(e){
    await prisma.$disconnect();
    return []
  }  
}

export const getCompras =async () => { //TODO: no le pongaany a todo
  try {
    const allCompras = await prisma.compra.findMany({ //select * from prisma.TABLE where user_id=1
    })
    return allCompras;
}
catch(e){
  await prisma.$disconnect();
  return []
}

}

export const getImagen =async (req:any) => { //TODO: no le ponga any a todo
  console.log(req.image);
  try {
    const oneImage = await prisma.imagen.findUnique ({ //select * from prisma.TABLE where user_id=1
    where:{
      image_id: req.image
    }
    })
    console.log(oneImage);
      if (oneImage == undefined){
        return (
          await prisma.imagen.findMany({
            where:{
              image_id: 0
            }
          })
        )[0].image //si no esta imagen no encontrada 
      }

    return oneImage.image;
}
catch(e){
  await prisma.$disconnect();
  console.log(e);
  return []
}

}