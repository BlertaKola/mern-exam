import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Project from './components/Project'
import Projects from './components/Projects'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <h1>PROJECT MANAGER</h1>
      <Routes>
        <Route path='/' element={<Projects/>}/>
        <Route path='/projects/new' element={<Project/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
