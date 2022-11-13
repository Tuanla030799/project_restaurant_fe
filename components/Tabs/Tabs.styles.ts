export const styles = {
  base: 'flex',
  label:
    'inline-flex items-center gap-2 outline-none font-medium transition-colors duration-200',
  types: {
    primary: {
      label: 'rounded-md',
      labelContainer: '',
      states: {
        default: 'text-gray-500 hover:text-primary-400',
        active: 'bg-primary-50 text-primary-400',
        disabled: 'text-gray-400 cursor-not-allowed',
      },
    },
    gray: {
      label: 'rounded-md',
      labelContainer: '',
      states: {
        default: 'text-gray-500 hover:text-gray-700',
        active: 'bg-gray-50 text-gray-700',
        disabled: 'text-gray-400 cursor-not-allowed',
      },
    },
    underline: {
      label: 'relative',
      labelContainer: '',
      states: {
        default: 'text-gray-500 hover:text-primary-400',
        active:
          'after:absolute after:left-0 after:top-full after:w-full after:border-b-2 after:border-primary-400 text-primary-400',
        disabled: 'text-gray-400 cursor-not-allowed',
      },
    },
  },
  sizes: {
    primary: {
      sm: 'text-md px-3 py-2',
      md: 'text-lg px-3.5 py-2.5',
    },
    gray: {
      sm: 'text-md px-3 py-2',
      md: 'text-lg px-3.5 py-2.5',
    },
    underline: {
      sm: 'text-md px-4 pb-4',
      md: 'text-lg px-4 pb-4.5',
    },
  },
  directions: {
    vertical: {
      labelContainer: 'rounded-lg border-r border-gray-300',
      tabs: 'flex items-stretch',
    },
    horizontal: {
      labelContainer: 'rounded-lg border-b border-gray-300',
      tabs: 'flex flex-col items-stretch',
    },
  },
}
