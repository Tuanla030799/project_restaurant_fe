export const styles = {
  base: 'inline-flex items-center gap-3 cursor-pointer border-gray-300',
  checked: {
    base: 'relative peer-checked:after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full',
    sm: 'after:w-2.5 after:h-2.5',
    md: 'after:w-3 after:h-3',
  },
  color: {
    primary:
      'peer-checked:border-primary-200 peer-checked:shadow-primary-200 peer-checked:after:bg-primary-400',
    success:
      'peer-checked:border-green-100 peer-checked:shadow-green-100 peer-checked:after:bg-green-500',
    error:
      'peer-checked:border-red-100 peer-checked:shadow-red-100 peer-checked:after:bg-red-500',
  },
  sizes: {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  },
  fontSize: {
    sm: 'text-xs',
    md: 'text-sm',
  },
}
