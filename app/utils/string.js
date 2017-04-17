export const formatConstant = s => (
  s.toLowerCase()
   .split('_')
   .map((s, i) => i ? s.charAt(0).toUpperCase() + s.slice(1) : s)
   .join('')
);

export const underscoreToCamelCased = s => s.replace(/_([a-z,0-9])/g, (g) => g[1].toUpperCase());
