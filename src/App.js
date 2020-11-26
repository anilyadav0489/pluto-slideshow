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
  images = [{name: i01, comment: "Hey.. wake up.. waaaaakkkkke uppp. It's school time now."},
  {name: i02, comment: "Somebody.. please hold me. I don't wanna go to school."},
  {name: i03, comment: "When you are the only one who hasn't finished the homework."},
  {name: i04, comment: "Lisa, could you please give me your maths notebook for a day."},
  {name: i05, comment: "God, please... please save me from Maths teacher for today."},
  {name: i06, comment: "She.. yes she.. She didn't let me complete my homework, mam."},
  {name: i07, comment: "Pluto: Do you know how far I am from the sun? \n Lisa: Dude... watch carefully.. you are still under the sun."},
  {name: i08, comment: "When teacher told: Pluto's status's been downgraded to 'Dwarf Planet'."},
  {name: i09, comment: "Don't worry. We don't discriminate the adopted ones"},
  {name: i010, comment: "Gosh.. All males have one and only one pose for photograph."},
  {name: i011, comment: "When it's actually Sunday.. but he's been told it's Monday."},
  {name: i012, comment: ""},]
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
            <img src={this.images[this.state.currentImage].name} alt=""></img>
          </div>
        </div>
        {this.state.currentImage >= 0 && this.state.currentImage < 11 && <div className="comment-container">
          {this.images[this.state.currentImage].comment}
        </div>}
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
