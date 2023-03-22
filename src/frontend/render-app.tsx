import * as ReactDOMClient from 'react-dom/client'
import App from './App'

const container = document.getElementById('app')

const root = ReactDOMClient.createRoot(container)

root.render(<App />)
