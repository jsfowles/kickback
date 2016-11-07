export const formatConstant = s => (
  s.toLowerCase()
   .split('_')
   .map((s, i) => i ? s.charAt(0).toUpperCase() + s.slice(1) : s)
   .join('')
);
