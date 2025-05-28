import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { routes } from './routes/route'
import ProtectedRoute from './utils/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import { permissionGet } from './servives/StaffServices'
import { setpermission } from './reduxStore/permissionSlice'
import Loader from './components/Loader'
function App() {
   const dispatch = useDispatch();

  const permission=useSelector((state)=>state?.permission?.data)
  const [loadingState,setLoadingState]=useState(false)
  const handlePermissionFetch=async()=>{
    try{
      setLoadingState(true)
 const permissionData=await permissionGet()

 dispatch(setpermission(permissionData.data))
 setLoadingState(false)
    }catch(err){
   console.log(err)
    }
  }
  useEffect(()=>{
    const token=localStorage.getItem("Cy_token")
    console.log(permission)
    if(!Object.keys(permission)?.length&&token){
    handlePermissionFetch()
    }
   

  },[permission])

  const RoutesMap=useMemo(()=>{
   const routeMap= routes.map((item)=>{
   

    
    if(item.layout&&Object.keys(permission||{}).length){
      return <Route path={item.routeLink} element={<ProtectedRoute permission={permission||[]} route={item} loader={loadingState} />} ></Route> 
    }
    return <Route path={item.routeLink} element={item.Component} />
  })
return routeMap
  },[permission,loadingState])
console.log(Routes)
  return loadingState?<Loader />: (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      {RoutesMap}
    </Routes>

    </BrowserRouter>
  )
}

export default App
