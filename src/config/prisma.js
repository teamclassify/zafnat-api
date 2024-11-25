import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  
  // crate roles
  // await prisma.role.create({
  //   data: {
  //     name: "admin",
  //   },
  // });
  //
  // await prisma.role.create({
  //   data: {
  //     name: "user",
  //   },
  // })
  //
  // await prisma.role.create({
  //   data: {
  //     name: "sales",
  //   },
  // });
  
  // create user
 try {
   await prisma.user.create({
     data: {
       email: "classifycomunicaciones@gmail.com",
       id: "JHuEHqZIVeV65S6ylMbXybDRlj73",
       firstName: "Classify",
       lastName: "Comunicaciones",
       photo: "",
       gender: "na",
     },
   });

   // create user role
   await prisma.usersOnRoles.create({
     data: {
       role: {
         connect: {
           id: 1,
         },
       },
       user: {
         connect: {
           id: "JHuEHqZIVeV65S6ylMbXybDRlj73"
         },
       },
       assignedBy: "system",
     },
   });

   await prisma.usersOnRoles.create({
     data: {
       role: {
         connect: {
           id: 2,
         },
       },
       user: {
         connect: {
           id: "JHuEHqZIVeV65S6ylMbXybDRlj73"
         },
       },
       assignedBy: "system",
     },
   });
 } catch (error) {
   console.log("User already exists");
 }
 
  // create category
  try {
    await prisma.category.create({
      data: {
        name: "Todo",
        description: "Todos los productos",
      },
    });
  } catch (error) {
    console.log("Category already exists");
  }
  
  try {
   await prisma.productAttribute.create({
      data: {
        type: "color",
        value: "negro",
      },
    });

    await prisma.productAttribute.create({
      data: {
        type: "color",
        value: "azul",
      },
    });

    await prisma.productAttribute.create({
      data: {
        type: "size",
        value: "XS",
      },
    });

    await prisma.productAttribute.create({
      data: {
        type: "size",
        value: "S",
      },
    });
  } catch (error) {
    console.log("Product attribute already exists");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default prisma;
