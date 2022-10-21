export const styles = {
  base: 'inline-flex child:shrink-0',
  states: {
    default:
      'transition-transform duration-200 child:cursor-pointer hover:scale-[1.2]',
    readOnly: '',
    disabled: 'opacity-40 child:cursor-not-allowed',
  },
  sizes: {
    sm: 18,
    md: 24,
    lg: 30,
  },
}
