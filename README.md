# Kinenovaa Web

Proyecto e-commerce para Clínica Estética/Kinesiología "Kinenovaa".

## Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: SQLite (Dev) / PostgreSQL (Prod) + Prisma ORM
- **Estado**: Zustand (Carrito persistente)
- **Pagos**: Transbank Webpay Plus (SDK Oficial)
- **Validación**: Zod

## Instalación y Configuración

1. **Clonar el repositorio**:
   ```bash
   git clone <url-repo>
   cd webkinenovaa
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```
   *Nota: Asegúrate de instalar también `tsx` para el seed script si no está global: `npm install -D tsx`*

3. **Configurar Variables de Entorno**:
   Crear un archivo `.env` en la raíz (ver `.env.example`):
   ```env
   DATABASE_URL="file:./dev.db"
   TRANSBANK_ENV="INTEGRATION"
   TRANSBANK_COMMERCE_CODE="597055555532" 
   TRANSBANK_API_KEY="579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"
   BASE_URL="http://localhost:3000"
   ```
   *(Las credenciales de Transbank arriba son las públicas de integración/sandbox)*

4. **Inicializar Base de Datos**:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

5. **Correr el proyecto**:
   ```bash
   npm run dev
   ```
   El sitio estará disponible en `http://localhost:3000`.

## Pruebas de Pago (Webpay Plus)

1. En el ambiente de integración (`TRANSBANK_ENV=INTEGRATION`), al ir a pagar serás redirigido a una página de prueba de Transbank.
2. Usa las tarjetas de crédito de prueba disponibles en la documentación de Transbank Developers.
3. Al finalizar, serás redirigido a `/pago/resultado`.

## Estructura del Proyecto

- `/app`: Rutas de Next.js (Pages, Layouts, API Routes).
  - `/api/webpay`: Endpoints para crear y confirmar transacciones.
  - `/tienda`: Catálogo de productos.
  - `/checkout`: Página de pago.
- `/components`:
  - `/ui`: Componentes base (Button, Input, etc.).
  - `/commerce`: Componentes de negocio (ProductCard, CartDrawer).
  - `/layout`: Header, Footer.
- `/lib`: Utilidades (Prisma Singleton, utils).
- `/store`: Zustand Stores (Carrito).
- `/prisma`: Schema y Seed.

## Comandos Útiles

- `npx prisma studio`: Interfaz visual para ver la base de datos.
- `next lint`: Verificar código.
