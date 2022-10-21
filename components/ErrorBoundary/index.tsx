import { Component, ErrorInfo, ReactNode } from 'react'
import { Fallback } from './Fallback'

interface IProps {
  children: ReactNode
}

interface IState {
  hasError: boolean
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): IState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    return this.state.hasError ? <Fallback /> : this.props.children
  }
}

export default ErrorBoundary
