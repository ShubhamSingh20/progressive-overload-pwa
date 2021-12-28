import React, { useState, useMemo, createContext } from 'react'

export const pagesMapping = { 
  menu: "menu",
  workoutLog: "workout_log"
}

interface QueryParam {
  splitDay?: string
}

interface RoutingContextType {
  page: string,
  queryParams: QueryParam,
  setPage: Function,
  setPath: Function,
  setQueryParams: Function,
}

export const RoutingContext = createContext<RoutingContextType>({ 
  page: pagesMapping.menu,
  queryParams: {},
  setPath: () => {},
  setPage: () => {},
  setQueryParams: () => {},
})

interface Props {
  children: React.ReactNode
}

const Router : React.FC<Props> = ({ children  }) => {
  let urlPath = window.location.pathname.slice(1).toLowerCase()

  const [page, setPage] = useState(urlPath || pagesMapping.menu)
  const [queryParams, setQueryParams] = useState({})

  const setPath = (url: string, queryParams: QueryParam) => {
    setPage(url);
    setQueryParams(queryParams);
  }

  const value = useMemo(
    () => ({ page, setPage, queryParams, setQueryParams, setPath }), 
    [page, setPage, queryParams, setQueryParams, setPath]
  )

  return (
    <RoutingContext.Provider value={value}>
      {children}
    </RoutingContext.Provider>
  )
}

export default Router
