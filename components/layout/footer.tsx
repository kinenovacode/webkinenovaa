import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold text-primary">KINENOVAA</h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Clínica estética y kinesiológica dedicada a resaltar tu belleza natural y mejorar tu bienestar con tecnología de vanguardia.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-4">Explorar</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/tienda" className="hover:text-primary transition-colors">Todos los Tratamientos</Link></li>
                            <li><Link href="/ofertas" className="hover:text-primary transition-colors">Ofertas Especiales</Link></li>
                            <li><Link href="/nosotros" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog de Belleza</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/terminos" className="hover:text-primary transition-colors">Términos y Condiciones</Link></li>
                            <li><Link href="/privacidad" className="hover:text-primary transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/envios" className="hover:text-primary transition-colors">Política de Envíos</Link></li>
                            <li><Link href="/devoluciones" className="hover:text-primary transition-colors">Cambios y Devoluciones</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-4">Contacto</h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>Av. Las Condes 12345, of 202,<br />Las Condes, Santiago.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+56 9 1234 5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>contacto@kinenovaa.cl</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Kinenovaa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
