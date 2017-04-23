import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      index: 0
    }
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
          <div>
            <h2>{card.title}</h2>
            <p>{card.front}</p>
          </div>
          <div>
            <p>{card.back}</p>
          </div>
        </Col>
          )
        })}
      </Row>
      <button onClick={this.addNewCard}>CLICK ME</button>
      </Grid>
    );
  }
}

export default App;
