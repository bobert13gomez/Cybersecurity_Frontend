import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes/route'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  const permission=useSelector((state)=>state?.permission?.data)
  useEffect(()=>{
    if(!permission?.length){

    }

  },[permission])

  const RoutesMap=useMemo(()=>{
   const routeMap= routes.map((item)=>{
    if(item.layout){
      return <Route path={item.routeLink} element={<ProtectedRoute permission={permission||[]} route={item} />} ></Route> 
    }
    return <Route path={item.routeLink} element={item.Component} />
  })
return routeMap
  },[permission])
console.log(Routes)
  return (
    <BrowserRouter>
    
    <Routes>
      {RoutesMap}
    </Routes>

    </BrowserRouter>
  )
}

export default App
