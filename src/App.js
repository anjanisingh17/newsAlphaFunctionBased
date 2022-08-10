import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

// 197ff824c42841b28e6e5f1a45d2ed84

export class App extends Component {

  pageSize = 10;
  api_key_num = process.env.REACT_APP_NEWS_API


  state = {
    progress : 0
  }

  setProgress = (progress)=>{
    this.setState({ progress : progress})
  }
  
  render() {
    return (
      <>      
      
      

      <Routers>
      <Navbar />
      <LoadingBar
        height= {3}
        color='blue'
        progress={this.state.progress}

      />
        <Routes>      
        <Route exact path='/' element={<News  setProgress={this.setProgress}   key="general" pageSize={this.pageSize} country='in' api_key = {this.api_key_num}  category='general' />} > </Route>
        <Route exact path='/newalpha2' element={<News  setProgress={this.setProgress}   key="general" pageSize={this.pageSize} country='in' api_key = {this.api_key_num}  category='general' />} > </Route>
          <Route exact path='/business' element={<News  setProgress={this.setProgress}   key="business" pageSize={this.pageSize} country='in' api_key = {this.api_key_num}  category='business' />}></Route>
          <Route exact path='/entertainment' element={<News  setProgress={this.setProgress}   key="entertainment" pageSize={this.pageSize} country='in' api_key = {this.api_key_num}  category='entertainment' />}></Route>
          <Route exact path='/general' element={<News  setProgress={this.setProgress}   key="general" pageSize={this.pageSize} country='in' api_key = {this.api_key_num}  category='general' />}></Route>
          <Route exact path='/health' element={<News  setProgress={this.setProgress}   key="health" pageSize={this.pageSize} country='in' api_key = {this.api_key_num}  category='health' />}></Route>
          

          <Route exact path='/technology' element={<News  setProgress={this.setProgress}   key="technology" pageSize={this.pageSize} country='in' api_key = {this.api_key_num}  category='technology' />}></Route>
          <Route exact path='/sports' element={<News  setProgress={this.setProgress}   key="sports" pageSize={this.pageSize} country='in' api_key = {this.api_key_num}  category='sports' />}></Route>
          <Route exact path='/science' element={<News  setProgress={this.setProgress}   key="science" pageSize={this.pageSize} country='in' api_key = {this.api_key_num}  category='science' />}></Route>
          
        </Routes>
      </Routers>

      </>

    )
  }
}

export default App
