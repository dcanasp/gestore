//npx prisma init 
//npm install @prisma/client 
//npx prisma generate
//npx prisma db pull
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {

  const addUsers = await prisma.usuario.
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
