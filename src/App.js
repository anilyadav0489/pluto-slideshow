import React, { Component } from 'react';
import './App.css';
import i01 from './assets/01.JPG'
import i02 from './assets/02.JPG'
import i03 from './assets/03.JPG'
import i04 from './assets/04.JPG'
import i05 from './assets/05.JPG'
import i06 from './assets/06.JPG'
import i07 from './assets/07.JPG'
import i08 from './assets/08.JPG'
import i09 from './assets/09.JPG'
import i010 from './assets/10.JPG'
import i011 from './assets/11.JPG'
import i012 from './assets/12.jpg'

class App extends Component {
  timer = null;
  images = [i01, i02, i03, i04, i05, i06, i07, i08, i09, i010, i011, i012]
  changeTime = 5000
  
  constructor(props){
    super(props);
    this.state={
      currentImage: 0,
      runningStatus: "Pause"
    }
  }

  startSlideShow=()=>{
    this.timer = setInterval(()=>{
      this.setState((prevState)=> {return {currentImage: prevState.currentImage + 1}})
    }, this.changeTime)
  }

  previous=()=>{
    clearInterval(this.timer)
    this.setState((prevState)=> {return {currentImage: prevState.currentImage - 1}})
    this.startSlideShow()
  }

  next=()=>{
    clearInterval(this.timer)
    this.setState((prevState)=> {return {currentImage: prevState.currentImage + 1}})
    this.startSlideShow()
  }

  restart=()=>{
    if(this.timer){
      clearInterval(this.timer)
      this.timer = null;
    }
    this.setState({currentImage: 0})
    this.startSlideShow()
  }
  pauseResume=()=>{
    if(this.timer) {
      clearInterval(this.timer)
      this.timer = null;
      console.log('timer', this.timer)
    } else {
      this.startSlideShow()
    }
    this.setState((prevState)=>{
      if(prevState.runningStatus === "Pause"){
        return {runningStatus: "Resume"}
      } else {
        return {runningStatus: "Pause"}
      }
    })
  }

  componentDidMount(){
    this.startSlideShow()
  }
  componentDidUpdate=()=>{
    if(this.state.currentImage > 10){
      clearInterval(this.timer)
      this.timer = null;
    }
  }
  render() {
    
    return (
      <div className="App">
        <div className="stars"/>
        <div className="twinkling"/>
        <div className="photo-container">
          <div className="progress-bar">
            <div className="image-count">
              {+(this.state.currentImage+1) + '/12'}
            </div>
          </div>
          <div className="photoframe">
            <img src={this.images[this.state.currentImage]} alt=""></img>
          </div>
        </div>
        {this.state.currentImage < 11 && <div className="right-arror-container" onClick={this.next}>
          <div className="right-arrow"></div>
        </div>}
        {this.state.currentImage > 0 && <div className="left-arrow-container" onClick={this.previous}>
          <div className="left-arrow"></div>
        </div>}
        <div className="restart-button" onClick={this.restart}>
          Restart
        </div>
        <div className="pause-button" onClick={this.pauseResume}>
          {this.state.runningStatus}
        </div>
      </div>
    );
  }
}

export default App;
