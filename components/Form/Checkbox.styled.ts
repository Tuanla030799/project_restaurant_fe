export const styles = {
  base: 'flex items-center gap-3 cursor-pointer',
  checkmark: {
    base: 'relative peer-checked:before:content-[""] before:absolute before:border-b-2 before:border-r-2 before:border-white before:rotate-45 before:left-1/2 before:-translate-x-1/2',
    indeterminate:
      'relative before:content-[""] before:absolute before:border-r-2 before:border-white before:rotate-90 before:left-1/2 before:-translate-x-1/2',
    sm: 'before:w-[7px] before:h-[10px]',
    md: 'before:w-[9px] before:h-[13px]',
  },
  sizes: {
    sm: 'w-[16px] h-[16px]',
    md: 'w-[20px] h-[20px]',
  },
  fontSize: {
    sm: 'text-xs',
    md: 'text-sm',
  },
  color: {
    primary: 'peer-checked:border-primary-400 peer-checked:bg-primary-400',
    success: 'peer-checked:border-green-500 peer-checked:bg-green-500',
    error: 'peer-checked:border-red-500 peer-checked:bg-red-500',
  },
}
