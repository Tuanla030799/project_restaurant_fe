export default async function downloadFile(
  filename: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
) {
  const blob = await data.blob()

  const objURL = window.URL.createObjectURL(blob)
  const downloadLink = document.createElement('a')

  downloadLink.style.display = 'none'
  downloadLink.href = objURL
  downloadLink.download = filename

  downloadLink.onload = () => {
    window.URL.revokeObjectURL(objURL)
  }

  document.body.appendChild(downloadLink)
  downloadLink.click()

  setTimeout(() => {
    document.body.removeChild(downloadLink)
  }, 0)
}
