export const styles = {
  base: 'bg-white border ring-0 rounded-lg transition-all duration-200',
  states: {
    enabled:
      'border-gray-300 ring-primary-50 focus-within:border-primary-300 focus-within:ring-4',
    error: 'border-error-300 ring-red-100 focus-within:ring-4',
  },
  toolbar:
    'flex flex-wrap items-center gap-3 px-4 py-3 border-b border-gray-300',
  urlInputContainer:
    'absolute z-elevate bg-white border border-gray-300 rounded p-3',
  urlInput:
    'px-2 py-1 outline-none border border-gray-300 rounded focus:border-primary-400',
  link: 'text-blue-500 underline',
  button: {
    base: 'inline-block text-gray-700 p-1 rounded',
    active: 'bg-primary-50 text-primary-500',
  },
  block: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    ul: 'list-disc ml-5',
    ol: 'list-decimal ml-5',
    blockquote: 'border-l-4 border-gray-300 py-1.5 px-4 my-2',
    codeBlock: 'bg-gray-800 text-white p-4 rounded',
  },
}
