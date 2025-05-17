/**
 * Paleta de colores armónica para transiciones suaves
 * 
 * Esta paleta está diseñada para crear transiciones suaves entre secciones
 * mediante gradientes y variaciones tonales sutiles.
 */

// Colores base
const colors = {
  // Tonos cálidos con una progresión natural
  warmBeige: {
    light: "linear-gradient(135deg, #F5F1EC 0%, #E2D8CD 100%)",
    medium: "linear-gradient(135deg, #E2D8CD 0%, #D4C5B7 100%)",
    dark: "linear-gradient(135deg, #D4C5B7 0%, #B8A89A 100%)"
  },
  
  // Tonos complementarios para contraste
  accentGold: {
    light: "linear-gradient(135deg, #F1EBD5 0%, #E3D7B4 100%)",
    medium: "linear-gradient(135deg, #D9C893 0%, #C9B87A 100%)",
    dark: "linear-gradient(135deg, #B8A86A 0%, #A89755 100%)"
  },
  
  // Tonos neutros para secciones de contenido
  neutral: {
    lightest: "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)",
    light: "linear-gradient(135deg, #F5F5F5 0%, #E5E5E5 100%)",
    medium: "linear-gradient(135deg, #E5E5E5 0%, #D5D5D5 100%)"
  }
};

// Ejemplo de uso en secciones
export const sectionBackgrounds = {
  hero: colors.warmBeige.light,
  features: colors.warmBeige.light,
  pricing: colors.neutral.medium,
  testimonials: colors.accentGold.light,
  contact: colors.neutral.light,
  footer: colors.warmBeige.dark
};

// Para usar en secciones:
// <section data-bg={sectionBackgrounds.hero}>...</section>