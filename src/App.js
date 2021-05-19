import './App.css';
import React, { Component } from 'react';
import PredictButton from './predict.js';
const logolink = "http://s3-wp-lyleprintingandp.netdna-ssl.com/wp-content/uploads/2018/01/09060054/cow-354428_1280.jpg"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logolink} alt="cow" height='30%' width='30%' />
        <p>
          A Milk Mastitis Predictor
        </p>
      </header>
      <body>
        <div>
          <PredictButton>
            YOLO
          </PredictButton>
        </div>
      </body>
    </div>
  );
}

export default App;
