import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Categories
    const facial = await prisma.category.upsert({
        where: { slug: "facial" },
        update: {},
        create: { name: "Facial", slug: "facial" },
    });

    const corporal = await prisma.category.upsert({
        where: { slug: "corporal" },
        update: {},
        create: { name: "Corporal", slug: "corporal" },
    });

    const kine = await prisma.category.upsert({
        where: { slug: "kinesiologia" },
        update: {},
        create: { name: "Kinesiología", slug: "kinesiologia" },
    });

    // Products
    await prisma.product.upsert({
        where: { slug: "limpieza-facial-profunda" },
        update: {},
        create: {
            name: "Limpieza Facial Profunda",
            slug: "limpieza-facial-profunda",
            description: "Tratamiento completo para renovar tu piel, eliminando impurezas y células muertas.",
            price: 35000,
            originalPrice: 45000,
            imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",
            categoryId: facial.id,
        },
    });

    await prisma.product.upsert({
        where: { slug: "masaje-descontracturante" },
        update: {},
        create: {
            name: "Masaje Descontracturante",
            slug: "masaje-descontracturante",
            description: "Alivia tensiones musculares y reduce el estrés con técnicas especializadas.",
            price: 25000,
            imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600",
            categoryId: corporal.id,
        },
    });

    await prisma.product.upsert({
        where: { slug: "evaluacion-kinesica" },
        update: {},
        create: {
            name: "Evaluación Kinésica",
            slug: "evaluacion-kinesica",
            description: "Diagnóstico completo realizado por profesionales para tu recuperación.",
            price: 20000,
            imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
            categoryId: kine.id,
        },
    });

    await prisma.product.upsert({
        where: { slug: "pack-rejuvenecimiento" },
        update: {},
        create: {
            name: "Pack Rejuvenecimiento",
            slug: "pack-rejuvenecimiento",
            description: "3 sesiones de radiofrecuencia + 1 limpieza facial. ¡Oferta imperdible!",
            price: 99990,
            originalPrice: 150000,
            imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600",
            categoryId: facial.id,
        },
    });

    console.log("Database seeded successfully!");
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
