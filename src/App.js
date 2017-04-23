import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactCardFlip from 'react-card-flip'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'

class App extends Component {
  constructor() {
    super()
    this.state = {
      cards: [],
      index: 0,
      isFlipped: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(click) {
    click.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  }  

  addNewCard = () => {
    let { cards, index } = this.state;
    cards.push({
      title: 'QUESTION #' + index,
      front: 'CARD INFO',
      back: 'ANSWER SHORT'
    })
    index++;
    this.setState({
      cards, index
    })
  }

  render() {
    return (
      <Grid>
        <Row>
        {this.state.cards.map((card, index) => {
          return (
            <Col md={12} key={index}>
              <ReactCardFlip isFlipped={this.state.isFlipped}>
                <div key="front" id="defCard">
                    <h3>{card.title}</h3>
                    <p>{card.front}</p>
                   <button id="defBut" onClick={this.handleClick}>FLIP</button>
                </div>
                <div key="back" id="defCard">
                    <p>{card.back}</p>
                   <button id="defBut" onClick={this.handleClick}>FLIP</button>
                </div>
                </ReactCardFlip>
              </Col>
                )
          })}
      </Row>
<button id="defButAdd" onClick={this.addNewCard}>ADD</button>
      </Grid>
    );
  }
}

export default App;
