import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { loginAuth } from '../servives/loginServices';
import { Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { activityPostLogs } from '../utils/ActivityLogs';
import { setpermission } from '../reduxStore/permissionSlice';

const LoginPage = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const permission=useSelector((state)=>state.permission.data)
  const [form]=useForm()
  const handleLogin=async()=>{
    try{
      const data=await form.validateFields()
     const res=await loginAuth(data)
     dispatch(setpermission(res.data?.data))
     activityPostLogs("LOGGED_IN")
     toast.success("Logged in sucessfully")
     const navLink=res?.data?.data?.permissions[0]?.permission_type
    navigate(`/${navLink}`)
    

    }catch(err){
      console.log(err)
    message.error(err.response.message)
    }
  } 

  useEffect(()=>{
    let local=localStorage.getItem("Cy_token")
   if(Object.keys(permission||{}).length&&local){
     const navLink=permission?.permissions[0]?.permission_type
    navigate(`/${navLink}`)
   }
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 px-4">
      <div className="flex w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="w-1/2 hidden md:block">
          <img
            src="/loginPage.jpg"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full bg-blue-100 flex items-center justify-center md:w-1/2 p-8"
        >
            <div className='w-full'>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
         <Form form={form} onFinish={handleLogin} className="space-y-5">
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
      Email Address
    </label>
    <Form.Item name={"email"} rules={[
          {
            required: true,
            message: 'Email is required',
          }]}>
    <Input
      id="email"
      type="email"
      name='email'
      
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-800"
    />
</Form.Item>
  </div>

  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>
<Form.Item name={"password"} rules={[
          {
            required: true,
            message: 'Email is required',
          }]}>
  <Input
      id="password"
      type="password"
      name='password'
      required
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-800"
    />
</Form.Item>
    
  </div>

  <button
    type="submit"
    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
  >
    Sign In
  </button>
</Form>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
