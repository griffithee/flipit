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
      title: 'Card #' + index,
      front: 'I am card ' + index,
      back: 'Back #' + index
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
                <div key="front">
                    <h2>{card.title}</h2>
                    <p>{card.front}</p>
                   <button onClick={this.handleClick}>FLIP</button>
                  <button onClick={this.addNewCard}>ADD</button>
                </div>
                <div key="back">
                    <p>{card.back}</p>
                   <button onClick={this.handleClick}>FLIP</button>
                  <button onClick={this.addNewCard}>ADD</button>
                </div>
                </ReactCardFlip>
              </Col>
                )
          })}
      </Row>
      </Grid>
    );
  }
}

export default App;
