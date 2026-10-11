/**
 * Brand color utilities for Ndzalama Training
 * Use these when you need programmatic access to brand colors
 */

export const brandColors = {
  primary: {
    base: '#1B3B1B',
    light: '#2D5D2D',
    dark: '#0F1F0F',
  },
  secondary: {
    base: '#7BC62D',
    light: '#9DD857',
    dark: '#5FA020',
  },
  neutral: {
    base: '#E8F0E8',
    light: '#F5F9F5',
    dark: '#D0E0D0',
  },
  text: {
    primary: '#222222',
    secondary: '#4A4F57',
    muted: '#666666',
    light: '#9CA3AF',
  },
  assessment: {
    learner: '#000000',
    assessor: '#FF0000',
    assessorAlt: '#FF6600',
    moderator: '#008000',
    externalModerator: '#800080',
  },
} as const;

export type BrandColorKey = keyof typeof brandColors;

/**
 * Get CSS variable name for a brand color
 */
export function getBrandColorVar(category: string, variant: string = 'base'): string {
  return `var(--brand-${category}${variant !== 'base' ? `-${variant}` : ''})`;
}

/**
 * Get Tailwind class for a brand color
 */
export function getBrandColorClass(
  type: 'bg' | 'text' | 'border',
  category: 'primary' | 'secondary' | 'neutral',
  variant?: 'light' | 'dark'
): string {
  const variantSuffix = variant ? `-${variant}` : '';
  return `${type}-brand-${category}${variantSuffix}`;
}
