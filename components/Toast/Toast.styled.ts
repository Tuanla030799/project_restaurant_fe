export const styles = {
  base: 'relative flex flex-col gap-2 p-4 border rounded-lg xs:flex-row',
  colors: {
    primary: {
      contained: 'bg-primary-600 border-primary-600 text-white',
      outlined: 'bg-primary-25 border-primary-300 text-primary-600',
    },
    gray: {
      contained: 'bg-gray-700 border-gray-700 text-white',
      outlined: 'bg-gray-25 border-gray-300 text-gray-600',
    },
    info: {
      contained: 'bg-info-600 border-info-600 text-white',
      outlined: 'bg-info-25 border-info-300 text-info-600',
    },
    error: {
      contained: 'bg-error-600 border-error-600 text-white',
      outlined: 'bg-error-25 border-error-300 text-error-600',
    },
    warning: {
      contained: 'bg-warning-500 border-warning-500 text-white',
      outlined: 'bg-warning-25 border-warning-300 text-warning-600',
    },
    success: {
      contained: 'bg-success-600 border-success-600 text-white',
      outlined: 'bg-success-25 border-success-300 text-success-600',
    },
  },
  placements: {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2 w-full xs:w-2/3 md:w-auto',
    top: 'top-0',
    bottom: 'bottom-0',
  },
}
