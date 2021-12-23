import React, { useState, useMemo, createContext } from 'react'

export const pagesMapping = { 
  menu: "menu",
  workoutLog: "workout-log"
}

export const RoutingContext = createContext({ page: pagesMapping.menu })

interface Props {
  children: React.ReactNode
}

const Router : React.FC<Props> = ({ children  }) => {
  let urlPath = window.location.pathname.slice(1).toLowerCase()
  const [page, setPage] = useState(urlPath || pagesMapping.menu)

  const value = useMemo(
    () => ({ page, setPage }), 
    [page, setPage]
  )

  return (
    <RoutingContext.Provider value={value}>
      {children}
    </RoutingContext.Provider>
  )
}

export default Router
