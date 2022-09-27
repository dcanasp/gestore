//npm install @prisma/client 
//npx prisma generate
//npx prisma db pull
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {

  const addUsers = await prisma.usuario.create({ //insert into ... (SI LO CORREN OTRA VEZ SE VA A CREAR, aqui pondria las funciones de creacion de datos y nice)
    data:{
      username: 'esteban',
      password: '12345',
      rol: 0,
      email: 'elopezb@unal.edu.co'
    }

  })
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
