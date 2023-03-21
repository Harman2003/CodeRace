import React from 'react'
import MonacoEditor from './components/MonacoEditor'
import Navbar from './components/Navbar'
const Editor = ({id}) => {
  return (
    <div className="h-full flex flex-col">
      <Navbar/>
      <MonacoEditor id={id}/>
    </div>
  )
}

export default Editor
