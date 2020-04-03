import React from 'react';
import './app-header.css';


const AppHeader = ({done, allPosts}) => {
  return (
    <div className ="app-header d-flex">
      <h1>Jamilya</h1>
      <h2>{allPosts} записей, из них сделано {done}</h2>
    </div>
  )
}

export default AppHeader;