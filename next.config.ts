/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otras configuraciones que ya tengas
  reactStrictMode: true,
  // Agregar esto para mostrar errores detallados
  onDemandEntries: {
    // Opciones para desarrollo
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;