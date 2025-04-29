import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/user/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Register />
      <ToastContainer />
    </>
  )
}

export default App
