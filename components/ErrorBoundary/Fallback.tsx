import { Button } from 'components/Button'

export const Fallback = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="mb-4 text-lg">Something went wrong!</h2>
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </div>
  )
}
