import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany({
    include: {
      //posts: true,
      where: {user_id:1},
    },
  })
  console.dir(allUsers, { depth: null })


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
