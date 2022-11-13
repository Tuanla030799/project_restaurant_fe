export const styles = {
  base: 'flex items-center justify-center w-full gap-5',
  item: 'flex flex-1 items-center relative border-y p-2 pl-7 border-solid border-gray-300 transition-all duration-200 first:rounded-l-lg first:border-l first:pl-3 last:rounded-r-lg last:border-r',
  number:
    'flex items-center justify-center text-display-xs font-semibold rounded-full w-8 h-8 p-1 transition-all duration-200',
  arrow: {
    base: 'absolute top-0 h-full border-l-[16px] border-r-0 border-t-[32px] border-b-[32px] border-l-gray-300 border-t-transparent border-b-transparent border-r-transparent after:absolute after:top-[-32px] after:right-px after:border-l-[16px] after:border-r-0 after:border-t-[32px] after:border-b-[32px] after:border-l-gray-300 after:border-t-transparent after:border-b-transparent after:border-r-transparent',
    left: 'left-0',
    right: 'left-full',
  },
  active: 'bg-gray-50',
}
