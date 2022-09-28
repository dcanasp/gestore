//npm install @prisma/client 
//npx prisma generate
//npx prisma db pull
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
const getNombre = () =>{
    let nombre = ["LEOPOLDO","VIVIANE","ENRIQUETA","MAYME","FELIX","SILVESTER","PILAR","KALLIE","ALEASE","BINDY","AMANCIO","LULU","HARLAND","JORDON","RENATA","WINSLOW","STACIE","ROSA","LISELOTTE","VICTORIA","ALBINA","ABRAHAM","EMILIANA","JOSUE","GEREON","XIMENA","RUBINA","DEMETRIO","CECILIO","OTTILIE"];
    return nombre[Math.floor(Math.random() * nombre.length)]+" "+ nombre[Math.floor(Math.random() * nombre.length)]
}
const getEmail = (nombre:string) =>{
    let dividido = nombre.split(" ");
    return dividido[0] + Math.floor(Math.random()*9999) + dividido[1]
}


async function main() {
for(let i =0;i<15;i++){

    let nombre = getNombre();
    const addUsers = await prisma.usuario.create({ //insert into ... (SI LO CORREN OTRA VEZ SE VA A CREAR, aqui pondria las funciones de creacion de datos y nice)
    data:{
        username: nombre,
        password: '1234',
        rol:  Math.floor(Math.random()*2)+1,
        email: getEmail(nombre)
        }
    
    })

}
    


    //const add //no se que añadir

  const allUsers = await prisma.usuario.findMany({ //select * from prisma.TABLE where user_id=1
      where: {
        user_id:1
      },

  })
  console.dir(allUsers, { depth: null })

  //const allUsers = await prisma.usuario.findMany() //select * from prisma.TABLE... 
  //console.log(allUsers)


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
