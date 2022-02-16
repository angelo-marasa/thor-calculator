import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const App = () => {
  //-- Stores the amount of nodes that the user inputs in
  const [heimdallNode, setHeimdallNode] = useState(0);
  const [freyaNode, setFreyaNode] = useState(0);
  const [thorNode, setThorNode] = useState(0);
  const [odinNode, setOdinNode] = useState(0);

  const [dailyRewards, setDailyRewards] = useState(0);
  
  //-- Stores the Thor price from the CoinGecko API
  const [thorPrice, setThorPrice] = useState(0);

  //-- Current Rewards values as per the Thor website
  const hemidalRewards = .008;
  const freyaRewards = .05;
  const thorRewards = .144
  const odinRewards = 1.02;

  //-- Setter functions ------------------------
  function handleThorPrice(price) {
    setThorPrice(price);
  }

  function handleHeimdalNodes(node) {
    setHeimdallNode(node);
    let rewards = ((node * hemidalRewards) + (freyaNode * freyaRewards) + (thorNode * thorRewards) + (odinNode * odinRewards));
    setDailyRewards(rewards);
  }

  function handleFreyaNodes(node) {
    setFreyaNode(node);
    let rewards = ((heimdallNode * hemidalRewards) + (node * freyaRewards) + (thorNode * thorRewards) + (odinNode * odinRewards));
    setDailyRewards(rewards);
  }

  function handleThorNodes(node) {
    setThorNode(node);
    let rewards = ((heimdallNode * hemidalRewards) + (freyaNode * freyaRewards) + (node * thorRewards) + (odinNode * odinRewards));
    setDailyRewards(rewards);
  }

  function handleOdinNodes(node) {
    setOdinNode(node);
    let rewards = ((heimdallNode * hemidalRewards) + (freyaNode * freyaRewards) + (thorNode * thorRewards) + (node * odinRewards));
    setDailyRewards(rewards);
  }

  //--------------------------------------------


  function getThorPrice() {
    axios.get(`https://api.coingecko.com/api/v3/coins/thor/tickers`)
    .then(res => {
      handleThorPrice(res['data']['tickers'][1]['converted_last']['usd']);
    });
  }

  useEffect(() => {
    getThorPrice();

    const timerId = setInterval(() => {
      getThorPrice();
   }, 60000);

  }, []);

  return (
    <>
    <div className="bg-gradient-to-r from-gray-900 to-gray-600 bg-gradient-to-r h-screen">
            <div className="container mx-auto pt-6 text-center">
                <h1 className="text-3xl font-bold text-white">
                    Thor Nodes Calculator
                </h1>

                <p className="text-white pt-4 mb-20">Price of $THOR <span className="rounded-r-lg rounded-l-lg bg-amber-400 p-2 ml-2">${thorPrice}</span></p>
                <p className="text-white mt-5 text-xl text-left">Whatcha got?</p>
                <div className="grid md:grid-cols-4 xs:grid-cols-2 gap-4 mt-5">
                    <div>
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                        Heimdall (1% Claim Fee)
                    </label>
                    <input type="number" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-400"
                        placeholder="0"
                        onInput={ ( e ) => handleHeimdalNodes( e.target.value ) }/>
                    </div>
                    <div>
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                        Freya (5% Claim Fee)
                    </label>
                    <input type="number" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-400"
                        placeholder="0"
                        onInput={ ( e ) => handleFreyaNodes( e.target.value ) }/>
                    </div>
                    <div>
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                        Thor (8% Claim Fee)
                    </label>
                    <input type="number" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-400"
                        placeholder="0"
                        onInput={ ( e ) => handleThorNodes( e.target.value ) }/>
                    </div>
                    <div>
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                        Odin (10% Claim Fee)
                    </label>
                    <input type="number" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-400"
                        placeholder="0"
                        onInput={ ( e ) => handleOdinNodes( e.target.value ) }/>
                    </div>
                </div>
                <p className="text-white pt-10 text-left">You're currently earning <span className="rounded-r-lg rounded-l-lg bg-amber-400 p-2 ml-2">{dailyRewards.toFixed(3)}</span> Thor per 24 hours. This is equal to <span className="rounded-r-lg rounded-l-lg bg-amber-400 p-2 ml-2">${(dailyRewards * thorPrice).toFixed(2)}</span> USD per day.</p>
                <hr className="mt-10 mb-10"/>
                <p className="text-white">This calculator gives you an idea of what it would look like for you to either taking some passive income or compounding. Above, you see what you're making per day. Let's select a larger time frame and see what you can do.</p>
            </div>
        </div>
    </>
  );
}

export default App;
