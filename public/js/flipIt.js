//localStorage.removeItem("flashcards");
//^ use this to delete local storage and revert to default cardData ^

// cardcardData format:
// cardcardData[{ catType:"", cards:[ {front:"",back:""} ] }, ... ]
// cardcardData[x].catType = Category Type
// cardcardData[x].cards[x].front
// cardcardData[x].cards[x].back

'use strict'; // enable strict mode to improve error-handling

import React, { Component } from 'react'
import { // destructuring assignment - extract multi obj prop, assign to var w/ 1 statement
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator,
    Image
} from 'react-native'; // allows drop of React prefix


let cardcardData = [
  { 
    catType:"HTML", // category 1
    cards: [
     { 
      front:"How can you make an ordered list?",
      back:"<ol><li>...</li></ol>"
     },
     { 
      front:"What is the correct HTML for making a text input field?",
      back:"<input type='text'>"
     }
    ]
  },

  { 
    catType:"SPANISH", // category 2
    cards: [
        { 
            front:"My name is ___",
            back:"Mi nombre es ___"
        },
        {
            front: "De donde eres?",
            back: "Where are you from?"
        }
     ]
  },

  { 
    catType:"GEOGRAPHY", // category 3
    cards: [
     { 
      front:"What is the capital of Japan?",
      back:"Tokyo"
     },
     { 
      front:"How much of the world's population lives in the Northern Hemisphere?",
      back:"90%"
     }
    ]
  },

  { 
    catType:"CIVICS", // category 4
    cards: [
     { 
      front:"How many stripes are on the U.S. flag?",
      back:"Thirteen"
     },
     { 
      front:"Who was the first president of the United States?",
      back:"George Washington"
     }
    ]
  },
];

let localData = false; // program using localStorage

// get and set locally stored cardData
if (typeof(Storage) !== "undefined") // if local storage is available
  {
  localData = true;
  if(localStorage.getItem("flashcards")!==null) // if there is already cardData in "flashcards"
    {
      cardData = JSON.parse(localStorage.getItem("flashcards")); // load cardData
    }
  else // else save a copy of the default cardData into local storage
    {
      localStorage.setItem("flashcards",JSON.stringify(cardData));
    }
  }

// main menu category selection
class Categories extends React.Component
{   
  pickCat()
  {
    return cardData.map(function(item,ind){
      return( <button className="catItem" onClick={ this.props.handleClick.bind(this,ind)}>{ item.catType }</button> );
    },this);
  }
 
  render()
  {
    return(
      <div className="animated fadeIn">
        <h1>Categories</h1>
        <h4>Select a category</h4>
        <div className="catBox">
          { this.pickCat() }
        <button className="catItem catAdd" onClick={ this.props.addCat.bind(this,"AddCat") }>+</button>
        </div>
      </div>
    );
  }
}

// Category Menu
class CatSet extends React.Component
{ 
  constructor(props)
  {
    super(props);
    this.state = { curCat:props.ind };
  }

  render(){
    return(
      <div className="animated fadeIn"> 
        <div className="Remove"onClick={ this.props.handleClick.bind(this,"RmvCat") } >X</div>
        <h1>{ cardData[this.state.curCat].catType }</h1>
        <button className="setButton" onClick={ this.props.handleClick.bind(this,"Start")} >Start</button>
        <button className="setButton"  onClick={ this.props.handleClick.bind(this,"Add")}>Add Card</button>
        <button className="setButton"  onClick={ this.props.handleClick.bind(this,"Menu")}>Menu</button>
      </div>
    );
  }
}

// Add a Card
class CardEdit extends React.Component
  {    
    saveCard()
    {
      cardData[this.props.ind].cards.push(
      { front:$("#frontInput").val(), back:$("#backInput").val()}
      );
     if(localData) // Save updated cardData
       {
        localStorage.setItem("flashcards",JSON.stringify(cardData)); 
       }
      this.props.handleClick("CatSet"); //Go back to category menu
    }
    
    render(){
      return(
       <div className="animated fadeIn">
      <h1>Add Card</h1>
          <lable>Front:</lable><br></br>
          <textArea cols='25' rows='4' id="frontInput"></textArea>
          <br></br>
      <lable>Back:</lable><br/>
      <textArea cols='25' rows='4' id="backInput"></textArea><br />
      <button className="AECButton" onClick={ this.props.handleClick.bind(this,"CatSet")}>Cancel</button>
      <button className="AECButton" onClick={ this.saveCard.bind(this) }>Add</button>
          </div>
      );
    }   
  }

//Primary app layout

class Layout extends React.Component
{ 
  constructor()
    {
    super();
    this.state={ scr:"Cats", curCat:-1, curCard:0, front:true };
    }
  
  setCat(ind)
    {
      this.setState({ scr:"CatSet", curCat:ind });
    }
  
  //Screen Selection function  
  setClick(str)
    {
      if(str==="Menu"){ this.setState({ scr:"Cats", curCat:-1 }); }
      else if(str==="CatSet"){ this.setState({ scr:"CatSet" }); }
      else if(str==="Add"){ this.setState({ scr:"Add" }); }
      else if(str==="AddCat"){ this.setState({ scr:"AddCat" }); }
      else if(str==="Start"){ this.setState({ scr:"Cards" }); }
      else if(str==="RmvCrd"){ this.setState({ scr:"RemoveCard" }); }
      else if(str==="RmvCat"){ this.setState({ scr:"RemoveCat" }); }
    }
  
  removeCard()
    {
      if(this.state.curCat===-1){ return; }
      cardData[this.state.curCat].cards.splice(this.state.curCard,1);
      
      if(localData) //Save updated cardData set
       {
        localStorage.setItem("flashcards",JSON.stringify(cardData)); 
       }
      
      this.setState({ curCard:0, scr:"Cards" });
    }
  
    removeCat()
    {
      if(this.state.curCat===-1){ return; }
      cardData.splice(this.state.curCat,1);
      
      if(localData) //Save updated cardData set
       {
        localStorage.setItem("flashcards",JSON.stringify(cardData)); 
       }
      
      this.setState({ curCard:0, scr:"Cats", curCat:-1 });
    }
  
  addCat()
    {
      cardData.push( { catType:$("#catInput").val(), cards:[] } );
      if(localData) //Save updated cardData set
       {
        localStorage.setItem("flashcards",JSON.stringify(cardData)); 
       }
      this.setState({ scr:"Cats" });
    }
  
  pickCurrent()
    {
      if(this.state.scr==="Cats") //Menu / Categories
        {
          return ( <Categories handleClick={ this.setCat.bind(this)} addCat={ this.setClick.bind(this) }/>)
        }
      if(this.state.scr==="CatSet") // Category Menu
        {
          return( <CatSet ind={ this.state.curCat } handleClick={this.setClick.bind(this) } />);
        }
      if(this.state.scr==="Add") // Add a Card
        {
          return( <CardEdit ind={ this.state.curCat } handleClick={this.setClick.bind(this) } />);
        }
      
      if(this.state.scr==="AddCat") // Add a Category
        {
          return( 
            <div>
              <h2>Category Name:</h2>
              <textArea cols='25' rows='4' id="catInput"></textArea><br />
              <button className="AECButton" onClick={ this.setClick.bind(this,"Menu") }>Cancel</button>
              <button className="AECButton" onClick={ this.addCat.bind(this) }>Add</button>
            </div>
          );
        }
      
      if(this.state.scr==="RemoveCard") // Remove a card
        {
          return (
            <div className="card animated fadeIn">
              <h2>Delete this card?</h2>
              <button className="AECButton" onClick={ this.removeCard.bind(this) } >Ok</button>
              <button className="AECButton" onClick={ this.setState.bind(this,{ scr:"Cards" }) }>Cancel</button>
            </div>
          );
        }
      
      if(this.state.scr==="RemoveCat") // Remove a Category and all it's cards
        {
          return (
            <div className="card animated fadeIn">
              <h2>Delete this category and all of it cards?</h2>
              <button className="AECButton" onClick={ this.removeCat.bind(this) } >Ok</button>
              <button className="AECButton" onClick={ this.setState.bind(this,{ scr:"CatSet" }) }>Cancel</button>
            </div>
          );
        }
      
      if(this.state.scr==="Cards") // Draw the current card
        {
          console.log(this.state.front);
          if(this.state.front)
            {
              return(
              <div>
              <div className="Remove" onClick={ this.setState.bind(this,{ scr:"RemoveCard" }) }>X</div>
              <div className="card animated fadeIn">                  
              <h2>{ cardData[this.state.curCat].cards[this.state.curCard].front }</h2>
              </div></div> );
            }
          else
            {
              return(
                <div>
                  <div className="Remove" onClick={ this.setState.bind(this,{ scr:"RemoveCard" }) }>X</div>
                  <div  className="card animated fadeIn">
                    <h2>{ cardData[this.state.curCat].cards[this.state.curCard].back }</h2>
                  </div>
                </div>);
            }
        }
    }
  
  nextCard() //Move to the next card in the current category
    {
      let cur=this.state.curCard;
      cur++;
      if(cur>=cardData[this.state.curCat].cards.length){ cur=0; }
      this.setState({ curCard:cur, front:true });
    }
  
  drawNav() //Draw card's nav bar
    {
      if(this.state.scr==="Cards") //Only show nav bar when displaying cards not Menu
        {
          if(this.state.front){
            return(
              <div className="navBar animated fadeIn">
              <button className="navButton"  onClick={ this.setState.bind(this,{ scr:"Cats", curCat:-1 }) }>Menu</button>
              <button className="navButton" onClick={ this.setState.bind(this,{ front:false })}>Answer</button>
              <button className="navButton" onClick={ this.nextCard.bind(this) }>Next</button>
              </div>
            );
          }
          else
            {
              return(
              <div className="navBar animated fadeIn">
              <button className="navButton" onClick={ this.setState.bind(this,{ scr:"Cats", curCat:-1 }) }>Menu</button>
              <button className="navButton" onClick={ this.setState.bind(this,{ front:true })}>Question</button>
              <button className="navButton" onClick={ this.nextCard.bind(this) }>Next</button>
              </div>
            );
            }
        }
    }
  
  render()
    {
      return(
        <body>
        <h1 className="animated tada">Flash Cards</h1>
        <h3 className="animated zoomIn">Creators: Leonela and Gene</h3>
        <h5 className="animated zoomIn">Hack Houston 2017</h5>
        <div className="mainBox">
           <div className="centerBox animated rollIn">
             {
               this.pickCurrent()
             }
           </div>
          { this.drawNav() }
        </div>
       </body>
      );
    }
}

const app = document.getElementById("app");
ReactDOM.render(<Layout />,app); 
module.exports = Categories, CatSet, CardEdit, Layout; // exports flipIt class for use in other files