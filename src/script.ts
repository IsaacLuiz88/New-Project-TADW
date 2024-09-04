import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const newCategory = await prisma.categorias.create({
        data: {
            nome: 'Aldebaran',
        },
    });
    const allCategories = await prisma.categorias.findMany()
    console.log(allCategories)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect();
    })