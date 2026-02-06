import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { OfferGrid } from "@/components/commerce/offer-grid";
import { ArrowRight, Star, Clock, MapPin, Phone } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  // Fetch featured products (offers)
  const offers = await prisma.product.findMany({
    where: {
      originalPrice: { not: null },
    },
    take: 4,
    include: {
      category: true,
    },
  });

  // Fetch categories
  const categories = await prisma.category.findMany();

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="Kinenovaa Spa"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-1000">
            Descubre tu Mejor <span className="text-primary italic">Versión</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            Tratamientos estéticos avanzados y kinesiología integral en un espacio diseñado para tu bienestar y relajación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
            <Button size="lg" variant="luxury" asChild className="text-lg px-8">
              <Link href="https://wa.me/56912345678">
                Agenda tu Evaluación Gratis
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-secondary text-lg px-8">
              <Link href="/tienda">
                Ver Tratamientos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <OfferGrid products={offers} />

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-secondary">Nuestros Servicios</h2>
              <p className="text-gray-500 mt-2">Explora nuestras áreas de especialidad</p>
            </div>
            <Link href="/tienda" className="hidden md:flex items-center text-primary font-medium hover:underline">
              Ver todo el catálogo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/tienda?category=${category.slug}`}
                className="group relative h-80 overflow-hidden rounded-lg shadow-md block"
              >
                <Image
                  src={`/images/categories/${category.slug}.png`} // Local images
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    Ver tratamientos &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/tienda" className="inline-flex items-center text-primary font-medium hover:underline">
              Ver todo el catálogo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Branches / Trust */}
      <section id="sucursales" className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                Visítanos en La Reina
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Nuestra clínica está ubicada en La Reina, con estacionamiento propio y vigilancia 24/7. Disfruta de un ambiente seguro, relajante y exclusivo.
              </p>

              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Dirección</h4>
                    <p className="text-gray-400">Avenida Echeñique 5839</p>
                    <p className="text-gray-400">La Reina, Santiago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Horarios</h4>
                    <p className="text-gray-400">Lunes a viernes de 10:00 a 20:00 hrs</p>
                    <p className="text-gray-400">Sabado 10:00 a 14:00 hrs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Contacto</h4>
                    <p className="text-gray-400">+56 9 1234 5678</p>
                    <p className="text-gray-400">contacto@kinenovaa.cl</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden border-4 border-primary/20 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.347514695995!2d-70.5648879242969!3d-33.43577769594595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662ce5a37452d9d%3A0xe549618831633516!2sAv.%20Eche%C3%B1ique%205839%2C%20La%20Reina%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1707145000000!5m2!1ses!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Kinenovaa"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
