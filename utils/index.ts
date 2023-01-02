import { DATE_FORMAT_DEFAULT } from '@/constants/common'
import { DEFAULT_PER_PAGE } from '@/constants/paginate'
import format from 'date-fns/format'
import getHours from 'date-fns/getHours'
import getMinutes from 'date-fns/getMinutes'
import isDateValid from 'date-fns/isValid'

export const getSelectOptions = (
  arr
): { value: string; label: string }[] | [] => {
  return arr
    ? arr.map(({ id, name, title, content }) => ({
        value: id,
        label: name || title || content,
      }))
    : []
}

export const getCategoryItems = (
  arr
): { id: number , href: string; label: string }[] | [] => {
  return arr
    ? arr.map(({ id, name, title, slug }) => ({
        id,
        label: name || title,
        href: slug
      }))
    : []
}

export const getSelectOptionsFromConst = (
  obj
): { value: string; label: string }[] | [] => {
  return obj
    ? Object.entries(obj).map(([label, value]) => ({
        label: label === 'online' ? 'Ordinary' : capitalizeFirstLetter(label),
        value: (value as string | number).toString(),
      }))
    : []
}

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const bytesToSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const decimal = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimal)) + ' ' + sizes[i]
}

export const formatDate = (date: string, locale = 'en') => {
  const options: any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const newDate = new Date(date)

  return newDate.toLocaleDateString(locale, options)
}

export const assignNestedObject = (obj, path, val) => {
  const keys = path.split('.')
  const lastKey = keys.pop()
  const lastObj = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), obj)
  lastObj && (lastObj[lastKey] = val)
}

export const slowLoading = (delay = 500): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export const convertBase64 = (file): Promise<any> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
export const getUrlFromNestedObject = (obj) => {
  return Object.entries(obj).reduce((prev, curr) => {
    const [key, value]: any = curr

    if (typeof value === 'object' && !value.length) {
      const url = Object.entries(value).reduce((prev, curr) => {
        const [child, values]: any = curr
        let url = ''

        if (typeof values === 'object' && values.length) {
          values.forEach((value) => {
            url += `${key}[${child}][]=${value}&`
          })
          return prev + url
        }

        if (
          (typeof values === 'string' && values.trim().length) ||
          typeof values === 'number'
        ) {
          return prev + `${key}[${child}]=${values}&`
        }

        return prev
      }, '')
      return prev + url
    }

    if (Array.isArray(value)) {
      let url = ''

      value.forEach((val) => {
        url += `${key}[]=${val}&`
      })

      return prev + url
    }

    return prev + `${key}=${value}&`
  }, '')
}

export const resizeImage = (
  base64Str: string,
  maxWidth = 400,
  maxHeight = 400
): Promise<string> => {
  return new Promise((resolve) => {
    let img = new Image()
    img.src = base64Str
    img.onload = () => {
      const MAX_WIDTH = maxWidth
      const MAX_HEIGHT = maxHeight
      let canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height
      if (maxWidth === maxHeight) {
        width = MAX_WIDTH
        height = MAX_HEIGHT
      } else if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx!.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL())
    }
  })
}

export const trimDataObject = (
  data: Record<string, any>
): Record<string, any> =>
  Object.entries(data).reduce(
    (prevObj, [key, val]) => ({
      ...prevObj,
      [key]: typeof val === 'string' ? val?.trim() : val,
    }),
    {}
  )

export const isPdf = (type: string) => {
  return type.split('/')[1].toLowerCase() === 'pdf'
}

export const convertTimeObjectToSecond = ({
  hour = 0,
  minute = 0,
}: {
  hour?: number
  minute?: number
}): number => hour * 60 * 60 + minute * 60

export const convertTimeToMinute = (time: Date) =>
  getHours(time) * 60 + getMinutes(time)

export const convertSecondsToHHMMSS = (seconds: number) =>
  new Date(seconds * 1000).toISOString().substr(11, 8)

export const convertSecondsToMMSS = (seconds: number) =>
  new Date(seconds * 1000).toISOString().substr(14, 5)

export const chunkArray = (arr, size: number) =>
  arr.length > size
    ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
    : [arr]

export const getOffsetElement = (
  el: HTMLElement | Element,
  parentElementHasScroll?: HTMLElement | null | Element
) => {
  const rect = el.getBoundingClientRect()
  const windowScrollLeft =
    window.pageXOffset || document.documentElement.scrollLeft
  const windowScrollTop =
    window.pageYOffset || document.documentElement.scrollTop

  const parentScrollTop = parentElementHasScroll?.scrollTop || 0
  const parentScrollLeft = parentElementHasScroll?.scrollLeft || 0

  return {
    top: rect.top + windowScrollTop + parentScrollTop,
    left: rect.left + windowScrollLeft + parentScrollLeft,
  }
}

export const isTextEllipsis = (element) =>
  element.offsetWidth < element.scrollWidth

export const getVideoDuration = (file: File) => {
  return new Promise((resolve, reject) => {
    try {
      let video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = function () {
        //@ts-ignore
        resolve(this.duration)
      }
      video.src = window.URL.createObjectURL(file)
    } catch (e) {
      reject(e)
    }
  })
}

export const numberFormatPrice = (price: number) => {
  if (!price) return '0'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

export const removeDigitCharacterOfString = (str: string): string =>
  str.replace(/[0-9]/g, '')

export const isObject = (obj: Record<string, any>): boolean => {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
}

export const convertSnakeToCamel = (
  obj: Record<string, any>
): Record<string, any> => {
  if (isObject(obj)) {
    const newObj = {}

    Object.keys(obj).forEach((key) => {
      newObj[
        key.replace(/(\_\w)/g, function (k) {
          return k[1].toUpperCase()
        })
      ] = convertSnakeToCamel(obj[key])
    })

    return newObj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertSnakeToCamel(item))
  }

  return obj
}

export const dateToString = (date: Date, formatString?: string): string =>
  isDateValid(date) ? format(date, formatString || DATE_FORMAT_DEFAULT) : ''

export const convertDefaultTextToRaw = (text: string) => {
  if (!text) return null

  return {
    blocks: [
      {
        key: 'random',
        data: {},
        depth: 0,
        entityRanges: [],
        text: text,
        type: 'unstyled',
      },
    ],
    entityMap: {},
  }
}

export const handleParagraph = (paragraph) => {
  if (!paragraph) return null

  if (paragraph.blocks && Object.keys(paragraph.blocks).length) return paragraph

  return convertDefaultTextToRaw(paragraph?.default_text)
}

export const isLink = (str: string) => {
  let pattern = new RegExp('^(https?:\\/\\/).+', 'i')
  return !!pattern.test(str)
}

export const addI18nToOptions = (
  options: {
    value: string | number
    label: string
  }[],
  t
) => {
  return options.map(({ value, label }) => ({
    value,
    label: t(label),
  }))
}

export const removeErrorByIndex = (errors, index) => {
  return Object.entries(errors).reduce((previous, current) => {
    const [key, value] = current
    const _key = Number(key)

    if (_key === index) return previous

    if (_key > index) {
      return {
        ...previous,
        [_key - 1]: value,
      }
    }

    return { ...previous, [_key]: value }
  }, {})
}

export const updateErrorByIndex = (errors, index) => {
  return Object.entries(errors).reduce((previous, current) => {
    const [key, value] = current
    const _key = Number(key)

    if (_key >= index) {
      return {
        ...previous,
        [_key + 1]: value,
      }
    }

    return { ...previous, [_key]: value }
  }, {})
}

export const getRanges = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, index) => index + start)
}

export const convertStringToDayMonYear = (time: string) => {
  const date = new Date(time.replaceAll('/', '-'))
  return date.toLocaleDateString('vi-VN')
}

export const formatLabelAction = (string: string): string => {
  return capitalizeFirstLetter(
    (string?.split('role_')?.[1] || string?.split('role_')?.[0])?.replaceAll(
      '_',
      ' '
    ) || string
  )
}

export const generateIndex = (
  index: number,
  page: number,
  itemPerPage: number = DEFAULT_PER_PAGE
) => {
  return index + (page - 1) * itemPerPage
}

export const handleURLAvatar = (avatar: string | null) => {
  if (!avatar) return

  return isLink(avatar)
    ? avatar
    : `${process.env.NEXT_PUBLIC_RESOURCE_DOMAIN}/images/50x50/${avatar}`
}

export const createFile = async ({ url, name, type }) => {
  const response = await fetch(url)
  const data = await response.blob()
  const fileData = new File([data], name, { type })

  return fileData
}
