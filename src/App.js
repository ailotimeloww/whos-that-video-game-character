import React from 'react';
import { useState } from 'react';
import charactersData from './assets/characters.js';
import './App.css';

let playerList = [];
let charaterIndex = 0;
let underline = '';
let isPlaying = true;

function List() {
  const [name, setName] = useState(''); // Declare a state variable...
  const [array, setArray] = useState(''); // Declare a state variable...
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {

      if (name.length !== 0) {
        playerList = [...playerList, {player: name, score: 0}];
        setArray(playerList);
        setName('');
      }
      console.log(playerList);
    }
  }
  const handleClick  = (index, action) => {
    if (action === "minus" && playerList[index].score !== 0) {
      playerList[index].score--;
      console.log(playerList[index].score);
    } else if (action === "plus") {
      playerList[index].score++;
      console.log(playerList[index].score);
    } else if (action === "delete") {
      playerList.splice(index, 1);
      console.log(playerList);
    }
    setArray([...playerList]);
  }
  return (
    <div>
      <input type='text' name='name' id='AddPlayer'
        value={name} // ...force the input's value to match the state variable...
        onChange={e => setName(e.target.value)} // ... and update the state variable on any edits!
        onKeyDown={handleKeyDown}
        placeholder='Add a player...'
      />
      <ul className='Players'>
          {playerList.map((item, index) => (
            <li key={index} aria-readonly><span><span className='delete'onClick={e => {handleClick(index,'delete');}}>x</span> {item.player}</span>
              <span className='score'>
                <span className='minus' onClick={e => {handleClick(index,'minus');}}>-</span>
                &nbsp;{item.score}&nbsp;
                <span className='plus' onClick={e => {handleClick(index,'plus');}}>+</span>
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

class App extends React.Component {
  state = { showing: true, show: -1, gameButtons: null, gameOver: false };
  render() {
    const startGame = () => {
      alert("Hello!");
    };
    const { showing } = this.state;
    let { show } = this.state;
    let { gameButtons } = this.state;
    let { gameOver } = this.state;
    const handleNext  = (index, action) => {
      if (action == "next" && charaterIndex == 20) {
        this.setState({gameOver: true});
        // alert("Thank you for playing!");
      } else if (action == "next") {
        let charName = charactersData[charaterIndex].name;
        if (gameButtons == 0) {
          this.setState({gameButtons: true});
        } else if (gameButtons != 0) {
          this.setState({gameButtons: !gameButtons});
        }
        this.setState({show: index});
        underline = charName.replace(/\S/g, "_");
        isPlaying = true;
      } else if (action == "reveal") {
        let charName = charactersData[charaterIndex].name;
        this.setState({gameButtons: !gameButtons});
        charaterIndex++;
        underline = charName;
        isPlaying = false;
      }
      console.log(charaterIndex);
    }
    return (
    <div className="App">
      <div className='PlayersContainer'>
        <List></List>
      </div>
      <div className='GameContainer' style={{ display: (gameOver ? 'none' : 'flex') }}>
        <h1> 
          Who's that <br></br>Video Game Character?
        </h1>
        <button className='start' onClick={e => {this.setState({ showing: !showing }); handleNext(0, "next");}} style={{ display: (showing ? 'block' : 'none') }}>Start</button>
        {charactersData.map((item, index) => (
          <div className='CharacterContainer' key={index} style={{ display: (show == index ? 'block' : 'none'), animationPlayState: isPlaying ? "running" : "paused" }}>
            <img className="Character animate" src={item.img} style={{ display: (gameButtons == true ? 'block' : 'none')  }}/>
            <img className="Character show" src={item.img} style={{ display: (gameButtons == true ? 'none' : 'block') }} />
            <p className='CharacterName'>{underline}</p>
          </div>
        ))}
        <div style={{ display: (showing ? 'none' : 'block') }}>
          <button className='next' onClick={e => {handleNext(charaterIndex, "reveal");}} style={{ display: (gameButtons == true ? 'block' : 'none') }}>Reveal</button>
          <button className='next' onClick={e => {handleNext(charaterIndex, "next");}} style={{ display: (gameButtons == true ? 'none' : 'block') }}>Next</button>
        </div>
      </div>
      <div className='GameContainer' style={{ display: (gameOver ? 'flex' : 'none') }}>
        <p className='gameOver'> 
          GAME OVER
        </p>
      </div>
    </div>
  );}
  updateInputValue(evt) {
    const val = evt.target.value;
    // ...       
    this.setState({
      inputValue: val
    });
  }
}

export default App;
