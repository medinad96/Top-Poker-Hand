import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      hand: []
    };

    this.dataToArray = this.dataToArray.bind(this);
    this.sortCards = this.sortCards.bind(this);
    this.isConsecutive = this.isConsecutive.bind(this);
    this.getRankDuplicates = this.getRankDuplicates.bind(this);
    this.getSuitDuplicates = this.getSuitDuplicates.bind(this);
    this.isFiveOfaKind = this.isFiveOfaKind.bind(this);
    this.isFourOfaKind = this.isFourOfaKind.bind(this);
    this.isThreeOfaKind = this.isThreeOfaKind.bind(this);
    this.isTwoPair = this.isTwoPair.bind(this);
    this.isOnePair = this.isOnePair.bind(this);
    this.isFlush = this.isFlush.bind(this);
    this.isStraightFlush = this.isStraightFlush.bind(this);
    this.isStraight = this.isStraight.bind(this);
    this.isFullHouse = this.isFullHouse.bind(this);
    this.isHighCard = this.isHighCard.bind(this);
    this.getTopRankingHand = this.getTopRankingHand.bind(this);

  }



  componentDidMount() {
    var deckid;
    var hand;


    axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then(res => {
        deckid = res.data.deck_id;

        //console.log(deckid);

        axios.get("https://deckofcardsapi.com/api/deck/"+deckid+"/draw/?count=5")
            .then(res => {
              hand = res.data;
              //console.log(hand);
              this.setState({hand});

          })
    });

  }

  dataToArray() {
    var jcards = [];
    jcards = this.state.hand.cards;
    //console.log(jcards);
    var cards = [];
    var i;
    for(i=0;i<5;i++){
      cards.push([jcards[i].value,jcards[i].suit]);

    }
    console.log("UNSORTED: "+ cards);
    console.log("SORTED: "+ this.sortCards(cards));
    var sorted_cards = this.sortCards(cards);

    console.log("IS CONSECUTIVE: "+ this.isConsecutive(sorted_cards));
    console.log("IS CONSECUTIVE Test: "+ this.isConsecutive([['2','HEARTS'],['3','CLUBS'],['4','DIAMONDS'],['5','HEARTS'],['ACE','CLUBS']]));
    console.log("IS CONSECUTIVE Test 2: "+ this.isConsecutive([['10','HEARTS'],['JACK','CLUBS'],['QUEEN','DIAMONDS'],['KING','HEARTS'],['ACE','CLUBS']]));

    console.log("GET RANK DUPLICATES TEST: "+ this.getRankDuplicates(sorted_cards));
    console.log("GET SUIT DUPLICATES TEST: "+ this.getSuitDuplicates(sorted_cards));


    console.log("isFiveOfaKind Test 1: "+ this.isFiveOfaKind([['2','HEARTS'],['3','CLUBS'],['4','DIAMONDS'],['5','HEARTS'],['ACE','CLUBS']]));
    console.log("isFiveOfaKind Test 2: "+ this.isFiveOfaKind([['2','HEARTS'],['2','CLUBS'],['2','DIAMONDS'],['2','HEARTS'],['2','CLUBS']]));

    console.log("isFourOfaKind Test 1: "+ this.isFourOfaKind([['2','HEARTS'],['3','CLUBS'],['4','DIAMONDS'],['5','HEARTS'],['ACE','CLUBS']]));
    console.log("isFourOfaKind Test 2: "+ this.isFourOfaKind([['2','HEARTS'],['2','CLUBS'],['2','DIAMONDS'],['2','HEARTS'],['3','CLUBS']]));

    console.log("isThreeOfaKind Test 1: "+ this.isThreeOfaKind([['2','HEARTS'],['3','CLUBS'],['4','DIAMONDS'],['5','HEARTS'],['ACE','CLUBS']]));
    console.log("isThreeOfaKind Test 2: "+ this.isThreeOfaKind([['2','HEARTS'],['2','CLUBS'],['2','DIAMONDS'],['4','HEARTS'],['3','CLUBS']]));

    console.log("isTwoPair Test 1: "+ this.isTwoPair([['2','HEARTS'],['3','CLUBS'],['4','DIAMONDS'],['5','HEARTS'],['ACE','CLUBS']]));
    console.log("isTwoPair Test 2: "+ this.isTwoPair([['2','HEARTS'],['2','CLUBS'],['4','DIAMONDS'],['4','HEARTS'],['3','CLUBS']]));

    console.log("isStraight Test 1: "+ this.isStraight([['2','HEARTS'],['KING','CLUBS'],['2','DIAMONDS'],['4','HEARTS'],['3','CLUBS']]));
    console.log("isStraight Test 2: "+ this.isStraight([['2','HEARTS'],['3','CLUBS'],['4','DIAMONDS'],['5','HEARTS'],['ACE','CLUBS']]));

    console.log("isFlush Test 1: "+ this.isFlush([['2','HEARTS'],['KING','CLUBS'],['2','DIAMONDS'],['4','HEARTS'],['3','CLUBS']]));
    console.log("isFlush Test 2: "+ this.isFlush([['2','HEARTS'],['5','HEARTS'],['4','HEARTS'],['5','HEARTS'],['ACE','HEARTS']]));

    console.log("isStraightFlush Test 1: "+ this.isStraightFlush([['2','HEARTS'],['KING','CLUBS'],['2','DIAMONDS'],['4','HEARTS'],['3','CLUBS']]));
    console.log("isStraightFlush Test 2: "+ this.isStraightFlush([['2','HEARTS'],['3','HEARTS'],['4','HEARTS'],['5','HEARTS'],['ACE','HEARTS']]));

    console.log("isFullHouse Test 1: "+ this.isFullHouse([['2','HEARTS'],['3','CLUBS'],['4','DIAMONDS'],['5','HEARTS'],['ACE','CLUBS']]));
    console.log("isFullHouse Test 2: "+ this.isFullHouse([['2','HEARTS'],['2','CLUBS'],['2','DIAMONDS'],['4','HEARTS'],['4','CLUBS']]));

    console.log("isOnePair Test 1: "+ this.isOnePair([['2','HEARTS'],['3','CLUBS'],['4','DIAMONDS'],['5','HEARTS'],['ACE','CLUBS']]));
    console.log("isOnePair Test 2: "+ this.isOnePair([['2','HEARTS'],['2','CLUBS'],['6','DIAMONDS'],['JACK','HEARTS'],['4','CLUBS']]));

    console.log("isHighCard Test 1: "+ this.isHighCard([['2','HEARTS'],['3','CLUBS'],['4','DIAMONDS'],['5','HEARTS'],['7','CLUBS']]));
    console.log("isHighCard Test 2: "+ this.isHighCard([['2','HEARTS'],['6','CLUBS'],['KING','DIAMONDS'],['9','HEARTS'],['4','CLUBS']]));

    console.log("getTopRankingHand Test 1 NOTHING: "+ this.getTopRankingHand([['2','HEARTS'],['9','CLUBS'],['4','DIAMONDS'],['7','HEARTS'],['10','CLUBS']]));
    console.log("getTopRankingHand Test 2 HIGHCARD: "+ this.getTopRankingHand([['2','HEARTS'],['7','CLUBS'],['3','DIAMONDS'],['JACK','HEARTS'],['6','CLUBS']]));
    console.log("getTopRankingHand Test 3 FIVE OF A KIND: "+ this.getTopRankingHand([['2','HEARTS'],['2','CLUBS'],['2','DIAMONDS'],['2','HEARTS'],['2','CLUBS']]));
    console.log("getTopRankingHand Test 4 FOUR OF A KIND: "+ this.getTopRankingHand([['2','HEARTS'],['2','CLUBS'],['2','DIAMONDS'],['2','HEARTS'],['3','CLUBS']]));
    console.log("getTopRankingHand Test 5 THREE OF A KIND: "+ this.getTopRankingHand([['2','HEARTS'],['2','CLUBS'],['2','DIAMONDS'],['5','HEARTS'],['3','CLUBS']]));
    console.log("getTopRankingHand Test 6 TWO PAIR: "+ this.getTopRankingHand([['2','HEARTS'],['2','CLUBS'],['8','DIAMONDS'],['8','HEARTS'],['3','CLUBS']]));
    console.log("getTopRankingHand Test 7 STRAIGHT: "+ this.getTopRankingHand([['2','HEARTS'],['3','CLUBS'],['4','DIAMONDS'],['5','HEARTS'],['ACE','CLUBS']]));
    console.log("getTopRankingHand Test 8 FLUSH: "+ this.getTopRankingHand([['2','HEARTS'],['7','HEARTS'],['4','HEARTS'],['9','HEARTS'],['ACE','HEARTS']]));
    console.log("getTopRankingHand Test 9 STRAIGHT FLUSH: "+ this.getTopRankingHand([['2','HEARTS'],['3','HEARTS'],['4','HEARTS'],['5','HEARTS'],['6','HEARTS']]));
    console.log("getTopRankingHand Test 10 ONE PAIR: "+ this.getTopRankingHand([['2','HEARTS'],['2','CLUBS'],['8','DIAMONDS'],['JACK','HEARTS'],['3','CLUBS']]));
    

    console.log("REAL getTopRankingHand: "+cards+": "+this.getTopRankingHand(cards) );

  }


  sortCards(c){
    const card_values = ['2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE'];

    if(c.length < 2) {
        return c;
    }

    var pivot = card_values.indexOf(c[0][0]);
    var pvt = c[0];
    var lesser = [];
    var greater = [];

    for(var i = 1; i < c.length; i++) {
      if( card_values.indexOf(c[i][0]) < pivot) {
        lesser.push(c[i]);
      } else {
        greater.push(c[i]);
      }
    }

    var ret = [];

    ret = this.sortCards(lesser).concat([pvt]);
    ret = ret.concat(this.sortCards(greater));

    return ret;

  }



  isConsecutive(c){
    //takes in sorted card array c
    const card_values = ['2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE'];

    for (var i = 1; i<c.length; i++){
      //console.log(card_values.indexOf(c[i][0]) - card_values.indexOf(c[i-1][0]))
      if(card_values.indexOf(c[i][0]) != card_values.indexOf(c[i-1][0])+1){
        //console.log(card_values.indexOf(c[i][0]) - card_values.indexOf(c[i-1][0]))
        var temp_slice = c
        temp_slice = temp_slice.slice(0,c.length-2) //*
        if(c[0][0] == '2' && c[c.length-1][0] == 'ACE' && this.isConsecutive(temp_slice)==true ){
          console.log("CONSECUTIVE EDGE CASE");
          return true;
        }
        return false;
      }

    }
    return true;
  }

  getRankDuplicates(c){

    var values = [];
    var dups = new Object();
    var dups = {};
    var d_arr = [];



    for(i=0;i<5;i++){
      console.log("CI PRINT: "+c[i]);
      values.push(c[i][0]);
    }

    console.log("VALUES: "+ values);


    for( var i =0;i<values.length;i++){
      if(!dups[values[i]]){
        dups[values[i]]=0;
      }
      //if(dups[values[i]]){
      dups[values[i]]+=1;
      //}
    }

    console.log("DUPS: "+ dups);

    for (var i in dups){
      //console.log("I: "+i);
      if(dups[i] > 1){
        //console.log("I: "+i);
        d_arr.push([i,0]);
      }
    }

    //console.log("DARR1: "+ d_arr);

    if(d_arr.length <1){
      return -1;
    }

    for(var x = 0; x<d_arr.length; x++){
        for(var y = 0; y<values.length; y++){
          if(d_arr[x][0]==values[y]){
            d_arr[x][1]+=1;
          }
        }
    }
    console.log(d_arr);
    return d_arr;


  }


  getSuitDuplicates(c){

    var values = [];
    var dups = new Object();
    var dups = {};
    var d_arr = [];

    for(i=0;i<5;i++){
      //console.log("CI PRINT: "+c[i]);
      values.push(c[i][1]);
    }

    console.log("SUIT VALUES: "+ values);


    for( var i =0;i<values.length;i++){
      if(!dups[values[i]]){
        dups[values[i]]=0;
      }
      //if(dups[values[i]]){
      dups[values[i]]+=1;
      //}
    }

    console.log("DUPS: "+ dups);

    for (var i in dups){
      //console.log("I: "+i);
      if(dups[i] > 1){
        //console.log("I: "+i);
        d_arr.push([i,0]);
      }
    }

    //console.log("DARR1: "+ d_arr);

    if(d_arr.length <1){
      return -1;
    }

    for(var x = 0; x<d_arr.length; x++){
        for(var y = 0; y<values.length; y++){
          if(d_arr[x][0]==values[y]){
            d_arr[x][1]+=1;
          }
        }
    }
    //console.log(d_arr);
    return d_arr;


  }

  // loop through hand, run checker functions
  // determine applicable hands
  // select the highest ranking hand

  isFiveOfaKind(c){
    var rd = [];
    rd = this.getRankDuplicates(c);
    if(rd.length == 1 && rd[0][1] == 5){
      return true;
    }
    return false;
  }

  isFourOfaKind(c){
    var rd = [];
    rd = this.getRankDuplicates(c);

    console.log("FOA: "+ this.getRankDuplicates(c));
    if( rd.length == 1 && rd[0][1] == 4){

      return true;
    }
    return false;
  }

  isThreeOfaKind(c){
    var rd = [];
    rd = this.getRankDuplicates(c);
    if(rd.length == 1 && rd[0][1] == 3){
      return true;
    }
    if(rd.length == 2){
      if(rd[0][1] == 3 || rd[1][1] == 3){
        return true;
      }
    }

    return false;
  }

  isOnePair(c){
    var rd = [];
    rd = this.getRankDuplicates(c);
    if(rd.length == 1 && rd[0][1] == 2){
      return true;
    }
    if(rd.length == 2){
      if(rd[0][1] >= 2 || rd[1][1] >= 2){
        return true;
      }
    }

    return false;
  }

  isTwoPair(c){
    var rd = [];
    rd = this.getRankDuplicates(c);
    if(rd.length == 2 && rd[0][1] == 2 && rd[1][1] == 2){
      return true;
    }

    return false;
  }

  isStraight(c){
    var rd = [];
    var dd = [];
    rd = this.sortCards(c);
    dd = this.getRankDuplicates(c);
    //console.log("DD!!!"+dd);
    if(dd>0){
      return false;
    }
    //console.log("CONSECUTIVE: "+ this.isConsecutive(rd) );
    return this.isConsecutive(rd);
  }

  isFlush(c){
    var rd = [];
    rd = this.getSuitDuplicates(c);
    if(rd.length == 1 && rd[0][1] == 5){
      return true;
    }
    return false;
  }

  isStraightFlush(c){
    if(this.isStraight(c)==true && this.isFlush(c)==true){
      return true;
    }
    return false;
  }

  isFullHouse(c){
    if(this.isOnePair(c)==true && this.isThreeOfaKind(c)==true){
      return true;
    }
    return false;
  }

  isHighCard(c){
    var rd  = this.sortCards(c);
    if(this.isOnePair(rd)==false){
      if(rd[rd.length-1][0] == 'JACK'  || rd[rd.length-1][0] == 'QUEEN' || rd[rd.length-1][0] == 'KING' || rd[rd.length-1][0] == 'ACE'){
        return true;
      }

    }
    return false;
  }

  getTopRankingHand(c){
    if(this.isFiveOfaKind(c)==true){
      return 'FIVE OF A KIND!';
    }
    else if(this.isStraightFlush(c)==true){
      return 'STRAIGHT FLUSH';
    }
    else if(this.isFourOfaKind(c)){
      return 'FOUR OF A KIND!';
    }
    else if(this.isFullHouse(c)==true){
      return 'FULL HOUSE!';
    }
    else if(this.isFlush(c)){
      return 'FLUSH!';
    }
    else if(this.isStraight(c)==true){
      return 'STRAIGHT!'
    }
    else if(this.isThreeOfaKind(c)==true){
      return 'THREE OF A KIND!';
    }
    else if(this.isTwoPair(c)==true){
      return 'TWO PAIR!';
    }
    else if(this.isOnePair(c)==true){
      return 'ONE PAIR!';
    }
    else if(this.isHighCard(c)==true){
      return 'HIGH CARD!';
    }
    else{
      return 'NOTHING';
    }


  }


  render() {

    return (


      <div className="App">
        <header  className="App-header">

        <button onClick={this.dataToArray}>Click Me!</button>

        </header>
      </div>
    );
  }
}

export default App;
