import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const allCategories = prisma.categoria.findMany()
    console.log(allCategories)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect();
    })