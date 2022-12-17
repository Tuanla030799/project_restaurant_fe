export default function getFileAttributesForDownload(response: Response) {
  const FILENAME_REGEX =
    /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/gi

  const contentType: string | null = response.headers.get('Content-Type')
  const contentDisposition: string | null = response.headers.get(
    'Content-Disposition'
  )

  let filename = ''

  if (contentDisposition) {
    const filenamesMatch = contentDisposition.match(FILENAME_REGEX)

    if (filenamesMatch) {
      filename = decodeURIComponent(
        filenamesMatch[0].replace(FILENAME_REGEX, '$1')
      )
    }
  }

  return { filename, contentType }
}
