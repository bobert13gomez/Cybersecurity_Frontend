import React from 'react';
import { motion } from 'framer-motion';

const LoginPage = () => {
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
         <form className="space-y-5">
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
      Email Address
    </label>
    <input
      id="email"
      type="email"
      required
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-800"
    />
  </div>

  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>
    <input
      id="password"
      type="password"
      required
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm text-gray-800"
    />
  </div>

  <button
    type="submit"
    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
  >
    Sign In
  </button>
</form>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
