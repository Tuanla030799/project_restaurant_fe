export const styles = {
  base: 'text-md border ring-0 rounded-lg overflow-hidden transition-all duration-200',
  states: {
    enabled:
      'border-gray-300 ring-primary-50 focus-within:border-primary-300 focus-within:ring-4',
    disabled:
      'border-gray-300 bg-gray-50 cursor-not-allowed child:pointer-events-none',
    error: 'border-error-300 ring-red-100 focus-within:ring-4',
  },
  sizes: {
    sm: 'px-3 py-2',
    md: 'px-3.5 py-2.5',
  },
}
