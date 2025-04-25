import React from 'react'
import Landing from '../components/Landing'
import NewMovie from '../components/NewMovie'
import HotMovie from '../components/HotMovie'

function Home() {
  return (
    <div >
      <Landing />
      <NewMovie />
      <HotMovie />
    </div>
  )
}

export default Home