import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient(
  // {
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 1000  * 60 * 5
  //     }
  //   }
  // }
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <App />
      <ReactQueryDevtools />
    </React.StrictMode>,
  </QueryClientProvider>
)
