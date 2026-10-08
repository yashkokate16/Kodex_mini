import React from 'react'
import SideBar from '../components/SideBar.jsx'
import ChatArea from '../components/ChatArea.jsx'
import Artifact from '../components/Artifact.jsx'

const HomePage = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
    
        <SideBar />

        <div className="flex-1 min-w-0 h-full">
          <ChatArea />

        </div>

        <Artifact />
      </div>
  )
}

export default HomePage