export const styles = {
  dropdown: {
    base: 'relative leading-none',
  },
  menu: {
    base: 'absolute z-dropdown w-menu bg-white shadow-md border border-gray-100 rounded overflow-hidden',
    placements: {
      top: 'mb-1 bottom-full left-1/2 -translate-x-1/2',
      'top-left': 'mb-1 bottom-full left-0',
      'top-right': 'mb-1 bottom-full right-0',
      right: 'ml-1 left-full top-1/2 -translate-y-1/2',
      'right-top': 'ml-1 left-full top-0',
      'right-bottom': 'ml-1 left-full bottom-0',
      bottom: 'mt-1 top-full left-1/2 -translate-x-1/2',
      'bottom-left': 'mt-1 top-full left-0',
      'bottom-right': 'mt-1 top-full right-0',
      left: 'mr-1 right-full top-1/2 -translate-y-1/2',
      'left-top': 'mr-1 right-full top-0',
      'left-bottom': 'mr-1 right-full bottom-0',
    },
  },
  item: {
    base: 'flex justify-between items-center px-4 py-2.5 text-md hover:bg-gray-50',
  },
  divider: {
    base: 'my-2 border-b border-gray-200',
  },
}
