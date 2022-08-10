import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

// 197ff824c42841b28e6e5f1a45d2ed84

const App = ()=> {

 const pageSize = 10;
 const api_key_num = process.env.REACT_APP_NEWS_API

  const[progress,setProgress] = useState(0)

  
  
    return (
      <>      
      
      

      <Routers>
      <Navbar />
      <LoadingBar
        height= {3}
        color='blue'
        progress={progress}

      />
        <Routes>      
        <Route exact path='/' element={<News  setProgress={setProgress}   key="general" pageSize={pageSize} country='in' api_key = {api_key_num}  category='general' />} > </Route>
        <Route exact path='/newalpha2' element={<News  setProgress={setProgress}   key="general" pageSize={pageSize} country='in' api_key = {api_key_num}  category='general' />} > </Route>
          <Route exact path='/business' element={<News  setProgress={setProgress}   key="business" pageSize={pageSize} country='in' api_key = {api_key_num}  category='business' />}></Route>
          <Route exact path='/entertainment' element={<News  setProgress={setProgress}   key="entertainment" pageSize={pageSize} country='in' api_key = {api_key_num}  category='entertainment' />}></Route>
          <Route exact path='/general' element={<News  setProgress={setProgress}   key="general" pageSize={pageSize} country='in' api_key = {api_key_num}  category='general' />}></Route>
          <Route exact path='/health' element={<News  setProgress={setProgress}   key="health" pageSize={pageSize} country='in' api_key = {api_key_num}  category='health' />}></Route>
          

          <Route exact path='/technology' element={<News  setProgress={setProgress}   key="technology" pageSize={pageSize} country='in' api_key = {api_key_num}  category='technology' />}></Route>
          <Route exact path='/sports' element={<News  setProgress={setProgress}   key="sports" pageSize={pageSize} country='in' api_key = {api_key_num}  category='sports' />}></Route>
          <Route exact path='/science' element={<News  setProgress={setProgress}   key="science" pageSize={pageSize} country='in' api_key = {api_key_num}  category='science' />}></Route>
          
        </Routes>
      </Routers>

      </>

    )
}

export default App
