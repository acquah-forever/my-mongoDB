import React from 'react'
import { Routes, Route} from "react-router-dom"
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient()

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <Routes>
        <Route /> 
      </Routes>
    </QueryClientProvider>
    </div>
  )
}

export default App
