import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
module.exports = {
    getProducts: async function () {
        let result = await prisma.products.findMany({
            include: {
                pictures: true,
            }
        });
        console.log("result", result);
    },
    createProduct: async function (newProduct) {
        const product = await prisma.products.create({
            data: newProduct
        })
        console.log("newProduct", product);
    },
    createProductDefault: async function (newProduct) {
        const createMany = await prisma.products.createMany({
            data: [
                { name: 'test1', price: 1000, active: true },
                { name: 'test2', price: 2000, active: true },
                { name: 'test3', price: 3000, active: true },
                { name: 'test4', price: 4000, active: true },
                { name: 'test5', price: 5000, active: true },
                { name: 'test6', price: 6000, active: true },
            ],
            skipDuplicates: true, // Skip 'Bobo'
        })
        console.log("newProduct", createMany);
    },
    deleteProductById: async function (productId) {
        try {
            const deletedProduct = await prisma.products.delete({
                where: { id: productId },
            });
            return deletedProduct;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
}