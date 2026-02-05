import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactoPage() {
    return (
        <div className="bg-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-serif font-bold text-secondary text-center mb-12">Contáctanos</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Info */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-secondary">Estamos aquí para ayudarte</h2>
                        <p className="text-gray-600 leading-relaxed">
                            ¿Tienes dudas sobre nuestros tratamientos? ¿Quieres agendar una evaluación personalizada?
                            Escríbenos o visítanos, estaremos encantados de atenderte.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-4 rounded-full">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Dirección</h3>
                                    <p className="text-gray-600">Av. Las Condes 12345, Oficina 202</p>
                                    <p className="text-gray-600">Las Condes, Santiago</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-4 rounded-full">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Teléfono / WhatsApp</h3>
                                    <p className="text-gray-600">+56 9 1234 5678</p>
                                    <p className="text-sm text-gray-400">Lun - Vie: 09:00 - 20:00</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-4 rounded-full">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Email</h3>
                                    <p className="text-gray-600">contacto@kinenovaa.cl</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm border">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                    <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                    <input type="tel" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                                <textarea rows={4} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 border" />
                            </div>

                            <Button variant="luxury" size="lg" className="w-full">
                                Enviar Mensaje
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
