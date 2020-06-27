import React, { Component } from 'react'
import Rules from './cmps/Rules'
import Universe from './cmps/Universe'
import './App.scss';
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          universe: new Universe(),
          size: [25,25],
          running: false,
          speed: 100,
          random: false,
          color: "blue"
        }
    
        this.handleColumn = this.handleColumn.bind(this);
        this.handleRow = this.handleRow.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.initialize = this.initialize.bind(this);
        this.changeRun = this.changeRun.bind(this);
        this.stopBoard = this.stopBoard.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.randomize = this.randomize.bind(this);
        this.storeCell = this.storeCell.bind(this);
        this.changeCell = this.changeCell.bind(this);
        
      }
      //allows the run of generation
      runGame() {
        this.setState({
          universe: this.state.universe.addGeneration()
        })
      }
  //creates row option and handler  
      handleRow(e) {
        if(!this.state.running){
          let actualSize = this.state.size;
    
          if(e.target.value < 90){
            actualSize[1] = e.target.value;
          } else {
            actualSize[1] = 25;
          }
            
          this.setState({
            size: actualSize
          });
    
          this.renderBoard();
        }
      }
//creates col option and handler    
      handleColumn(e) {
        if(!this.state.running){
          let actualSize = this.state.size;
    
          if(e.target.value < 90){
            actualSize[0] = e.target.value;
          } else {
            actualSize[0] = 25;
          }
            
          this.setState({
            size: actualSize
          });
    
          this.renderBoard();
        }
      }
//  handles the speed adjustment 
      initialize() {
        if(!this.state.running){
          this.setState({
            running: true,
          }, () => {
            this.intervalRef = setInterval(()=> this.runGame(), this.state.speed);
          })
        }
      }
    //start stop
      changeRun(e){
        this.setState({
            speed: e.target.value
          })
        if(this.state.running){
          this.stopBoard()
          setTimeout(()=> {this.initialize()}, 100)
        }
      }
    //stop button
      stopBoard(){
        this.setState({
          running: false
        }, () => {
          if(this.intervalRef){
            clearInterval(this.intervalRef)
          }
        })
      }
    //clears live cells
      resetBoard(){
        this.setState({
          running: false,
          universe: new Universe()
        }, () => {
          if(this.intervalRef){
            clearInterval(this.intervalRef)
          }
        })
      }
    //updates cell options
      storeCell(position){
        if(!this.state.running){
          this.setState({
            universe: this.state.universe.storeCell(position)
          })
        }
      }
    
      changeCell(e){
        this.setState({
            color: e.target.value
          })
        
      }
    //board creator
      renderBoard() {
        let newWorld = [];
        let cellRow = [];
    
        if (this.state.random === false){
          for(let i = 0; i < this.state.size[0]; i++) {
            for (let j = 0; j < this.state.size[1]; j++){
              if(this.state.universe.isAlive(i + " , " + j)){
                cellRow.push(
                  <Cell backgroundColor={`${this.state.color}`} key={[i, j]} position={{x: i, y: j}} live={true} storeCell={this.storeCell.bind(this)}/>
                );
              } else {
                cellRow.push(
                  <Cell backgroundColor='white' key={[i, j]} position={{x: i, y: j}} live={false} storeCell={this.storeCell.bind(this)}/>
                );
              }
            }
            newWorld.push(<div className="row" key={i}>{cellRow}</div>);
            cellRow = [];
          }
          return newWorld;
        } else {
          return this.randomBoard()
        }
        
      }
    
    //allows random generator
      randomBoard() {
        let newWorld = [];
        let cellRow = [];
        for(let i = 0; i < this.state.size[0]; i++) {
          for (let j = 0; j < this.state.size[1]; j++){
            let randomNum = Math.random()
            if(randomNum > .7){
              cellRow.push(
                <Cell key={[i, j]} position={{x: i, y: j}} live={true} storeCell={this.storeCell.bind(this)}/>
              );
            } else {
              cellRow.push(
                <Cell key={[i, j]} position={{x: i, y: j}} live={false} storeCell={this.storeCell.bind(this)}/>
              );
            }
          }
          newWorld.push(<div className="row" key={i}>{cellRow}</div>);
          cellRow = [];
        }
    
        return newWorld;
      }
    // selects random live cells
      randomize() {
        if (!this.state.random){
          this.setState({
            random: true
          })
    
        }
      }
    
    render() {
        return (
            <>
                <div className='buttons'>
                    <button onClick={this.initialize}>Start</button>
                    <button onClick={this.stopBoard}>Stop</button>
                    <button onClick={this.resetBoard}>Reset</button>
                    <button onClick={this.randomize}>Randomize</button>
                </div>
                <p className='generation'>Generation : {this.state.universe.getGeneration()}</p>
                <div className='board'>
                     {this.renderBoard()}
                </div>
                <div className='adjustments'>
                 <label>
                    Rows: 
                    <input className="input" type="text" value={this.state.size[1]} onChange={this.handleRow} />
              </label>

              <label>
                    Columns:
                    <input className="input" type="text" value={this.state.size[0]} onChange={this.handleColumn} />
              </label>

              <label>
                    Change speed:
                    <input className="input" type="text" value={this.state.speed} onChange={(e) => {this.changeRun(e)}} />
              </label>

              <label>
                     Change color:
                     <input className="input" type="text" value={this.state.color} onChange={(e) => {this.changeCell(e)}} />
              </label>
                </div>

                <Rules/>
            </>
        )
    }
}
//toggles cell state from death to life
class Cell extends App {
    render(props) {
      return (
        <>
        
        <div  onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? "cellContainerLive" : "cellContainerDead"} ></div>
        </>
      );
    }
  }
