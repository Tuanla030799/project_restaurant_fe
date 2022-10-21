export type ForwardRefWithStaticComponent<
  Props extends Record<string, any>,
  Static extends Record<string, any>
> = ((props: Props) => React.ReactElement) &
  Static & {
    displayName: string
  }
