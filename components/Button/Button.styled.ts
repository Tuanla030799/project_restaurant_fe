export const styles = {
  base: 'relative inline-flex justify-center whitespace-nowrap items-center gap-2 border cursor-pointer font-medium transition-all duration-200 disabled:cursor-not-allowed',
  colors: {
    primary: {
      contained:
        'bg-primary-400 text-white border-primary-400 hover:bg-primary-500 hover:border-primary-500 disabled:bg-primary-100 disabled:border-primary-100 disabled:hover:bg-primary-100 disabled:hover:border-primary-100',
      light:
        'bg-primary-50 text-primary-400 border-primary-50 hover:bg-primary-100 hover:border-primary-100 disabled:bg-primary-50 disabled:border-primary-50 disabled:text-primary-200 disabled:hover:bg-primary-50 disabled:hover:border-primary-50',
      outlined:
        'bg-white text-primary-400 border-primary-400 hover:bg-primary-50 disabled:border-primary-100 disabled:text-primary-200 disabled:hover:bg-white disabled:hover:border-primary-100',
      text: 'text-primary-400 border-transparent hover:border-primary-50 hover:bg-primary-50 disabled:text-gray-300 disabled:hover:bg-white disabled:hover:border-white',
      link: 'text-primary-400 border-transparent hover:underline disabled:text-gray-300',
    },
    gray: {
      contained:
        'bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900 disabled:bg-gray-300 disabled:border-gray-300 disabled:hover:bg-gray-300 disabled:hover:border-gray-300',
      light:
        'bg-gray-50 text-gray-700 border-gray-50 hover:bg-gray-100 hover:border-gray-100 disabled:bg-gray-50 disabled:border-gray-50 disabled:text-gray-300 disabled:hover:bg-gray-50 disabled:hover:border-gray-50',
      outlined:
        'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-white disabled:hover:border-gray-200',
      text: 'text-gray-700 border-transparent hover:border-gray-50 hover:bg-gray-50 disabled:text-gray-300 disabled:hover:bg-white disabled:hover:border-white',
      link: 'text-gray-700 border-transparent hover:underline disabled:text-gray-300',
    },
    info: {
      contained:
        'bg-info-600 text-white border-info-600 hover:bg-info-700 hover:border-info-700 disabled:bg-info-200 disabled:border-info-200 disabled:hover:bg-info-200 disabled:hover:border-info-200',
      light:
        'bg-info-25 text-info-500 border-info-50 hover:bg-info-50 hover:border-info-50 disabled:bg-info-25 disabled:border-info-25 disabled:text-info-300 disabled:hover:bg-info-25 disabled:hover:border-info-25',
      outlined:
        'bg-white text-info-600 border-info-500 hover:bg-info-50 disabled:border-info-200 disabled:text-info-300 disabled:hover:bg-white disabled:hover:border-info-200',
      text: 'text-info-600 border-transparent hover:border-info-50 hover:bg-info-50 disabled:text-gray-300 disabled:hover:bg-white disabled:hover:border-white',
      link: 'text-info-600 border-transparent hover:underline disabled:text-gray-300',
    },
    error: {
      contained:
        'bg-error-600 text-white border-error-600 hover:bg-error-700 hover:border-error-700 disabled:bg-error-200 disabled:border-error-200 disabled:hover:bg-error-200 disabled:hover:border-error-200',
      light:
        'bg-error-25 text-error-700 border-error-50 hover:bg-error-50 hover:border-error-50 disabled:bg-error-25 disabled:border-error-25 disabled:text-error-300 disabled:hover:bg-error-25 disabled:hover:border-error-25',
      outlined:
        'bg-white text-error-700 border-error-500 hover:bg-error-50 disabled:border-error-200 disabled:text-error-300 disabled:hover:bg-white disabled:hover:border-error-200',
      text: 'text-error-700 border-transparent hover:border-error-50 hover:bg-error-50 disabled:text-gray-300 disabled:hover:bg-white disabled:hover:border-white',
      link: 'text-error-700 border-transparent hover:underline disabled:text-gray-300',
    },
    warning: {
      contained:
        'bg-warning-500 text-white border-warning-500 hover:bg-warning-600 hover:border-warning-600 disabled:bg-warning-200 disabled:border-warning-200 disabled:hover:bg-warning-200 disabled:hover:border-warning-200',
      light:
        'bg-warning-25 text-warning-600 border-warning-50 hover:bg-warning-50 hover:border-warning-50 disabled:bg-warning-25 disabled:border-warning-25 disabled:text-warning-200 disabled:hover:bg-warning-25 disabled:hover:border-warning-25',
      outlined:
        'bg-white text-warning-600 border-warning-400 hover:bg-warning-50 disabled:border-warning-100 disabled:text-warning-200 disabled:hover:bg-white disabled:hover:border-warning-100',
      text: 'text-warning-600 border-transparent hover:border-warning-50 hover:bg-warning-50 disabled:text-gray-300 disabled:hover:bg-white disabled:hover:border-white',
      link: 'text-warning-600 border-transparent hover:underline disabled:text-gray-300',
    },
    success: {
      contained:
        'bg-success-600 text-white border-success-600 hover:bg-success-700 hover:border-success-700 disabled:bg-success-200 disabled:border-success-200 disabled:hover:bg-success-200 disabled:hover:border-success-200',
      light:
        'bg-success-25 text-success-600 border-success-50 hover:bg-success-50 hover:border-success-50 disabled:bg-success-25 disabled:border-success-25 disabled:text-success-300 disabled:hover:bg-success-25 disabled:hover:border-success-25',
      outlined:
        'bg-white text-success-600 border-success-500 hover:bg-success-50 disabled:border-success-200 disabled:text-success-300 disabled:hover:bg-white disabled:hover:border-success-200',
      text: 'text-success-600 border-transparent hover:border-success-50 hover:bg-success-50 disabled:text-gray-300 disabled:hover:bg-white disabled:hover:border-white',
      link: 'text-success-600 border-transparent hover:underline disabled:text-gray-300',
    },
  },
  fontSizes: {
    xs: 'text-sm',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-md',
    xl: 'text-md',
    '2xl': 'text-lg',
  },
  sizes: {
    default: {
      xs: 'px-2 py-1 rounded-md',
      sm: 'px-3.5 py-2 rounded-lg',
      md: 'px-4 py-2.5 rounded-lg',
      lg: 'px-[18px] py-2.5 rounded-lg',
      xl: 'px-5 py-3 rounded-lg',
      '2xl': 'px-6 py-4 rounded-lg',
    },
    icon: {
      xs: 'p-1 rounded-md',
      sm: 'p-2 rounded-md',
      md: 'p-2.5 rounded-lg',
      lg: 'p-3 rounded-lg',
      xl: 'p-3.5 rounded-lg',
      '2xl': 'p-4 rounded-lg',
    },
  },
  width: {
    auto: 'w-auto',
    fluid: 'w-full',
  },
}
