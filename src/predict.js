import React, { Component } from 'react';
var empty = [];
const toString = (s) => {
  if (typeof s !== 'string') return ''
  if (s == 0) return "Healthy";
  else return "Mastitis"
}
var counter = 0
const url = "http://127.0.0.1:5000/api/predict"
var adata = require('./trainSet.json')
const packet = { "data": [0.06867524, 0.08660228, 0.08826797, 0.1990125, 0.87207229, -0.39312044] };
const alldata = adata['data']
export default class PredictButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loaded: false,
      isFetching: false
    }
  }
  componentDidMount() {
    this.fetchPred();
    this.timer = setInterval(() => this.fetchPred(), 2000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  fetchPred = async () => {


    this.setState({ ...this.state, isFetching: true });
    var consect = []
    var i;
    for (i = 0; i < 6; i++) {
      consect.push(alldata[counter + i].slice(2))
    }
    await fetch(url, {
      method: 'POST', mode: 'cors', headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
        "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
      }, body: JSON.stringify({ "data": consect })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result["condition"] == "mastitis") {
          empty.push(result["condition"] + "    " + result["pathogen"]);
        }
        else {
          empty.push(result["condition"])
        }
        console.log(empty)
        this.setState({ data: empty, loaded: true });

      })
    counter = counter + 6;
    if (counter > 50000) {
      counter = 0
    }
  }


  render() {
    return (
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: '400', textAlign: 'center' }}>Live Predictions</h1>
        {(() => {
          if (this.state.loaded === true) {
            return (
              <div >
                <div >
                  {
                    this.state.data.map(pred => <p style={{ fontSize: '20px', fontWeight: '400', textAlign: 'center' }}>
                      {pred}</p>)
                  }

                </div>
              </div>
            )
          }
        })()}

      </div>
    );
  }
}