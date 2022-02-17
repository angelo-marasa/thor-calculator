import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from './components/Footer';

const App = () => {
  //-- Stores the amount of nodes that the user inputs in
  const [heimdallNode, setHeimdallNode] = useState(0);
  const [freyaNode, setFreyaNode] = useState(0);
  const [thorNode, setThorNode] = useState(0);
  const [odinNode, setOdinNode] = useState(0);

  const [godMode, setGodMode] = useState(false);
  const [actionDays, setActionDays] = useState(0);
  const [dailyRewards, setDailyRewards] = useState(0);
  
  //-- Stores the Thor price from the CoinGecko API
  const [thorPrice, setThorPrice] = useState(0);

  //-- Current Rewards values as per the Thor website
  const hemidalRewards = .008;
  const freyaRewards = .05;
  const thorRewards = .144
  const odinRewards = 1.02;

  const heimdalCost = 1.25;
  const freyaCost = 6.25;
  const thorCost = 12.5;
  const odinCost = 78.25;

  const heimdalTax = 1;
  const freyaTax = 5;
  const thorTax = 8;
  const odinTax = 10;

  //-- Setter functions ------------------------
  function handleThorPrice(price) {
    setThorPrice(price);
  }

  function handleActionDays(days) {
      setActionDays(days);
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

  function earningsAfterFees(grossEarnings) {
    
  }

  function getThorPrice() {
    axios.get(`https://api.coingecko.com/api/v3/coins/thor/tickers`)
    .then(res => {
      handleThorPrice(res['data']['tickers'][1]['converted_last']['usd']);
    });
  }

  useEffect(() => {
    getThorPrice();

    setInterval(() => {
      getThorPrice();
   }, 60000);

  }, []);

  return (
    <>
    <div className="bg-gradient-to-r from-gray-900 to-gray-600 bg-gradient-to-r sm:h-full md:h-full">
            <div className="container px-4 mx-auto pt-6">
                <h1 className="text-3xl font-bold text-white text-center">
                    Thor Nodes Calculator
                </h1>

                <p className="text-white pt-4 mb-20 text-center">Price of $THOR <span className="rounded-r-lg rounded-l-lg bg-amber-400 p-2 ml-2">${thorPrice}</span></p>
                <p className="text-white mt-5 text-xl text-left">Whatcha got?</p>
                <div className="grid md:grid-cols-4 xs:grid-cols-2 gap-4 mt-5">
                    <div>
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                        Heimdall (1% Claim Fee)
                    </label>
                    <input type="number" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-400"
                        placeholder="0"
                        pattern="\d*"
                        onInput={ ( e ) => handleHeimdalNodes( e.target.value ) }/>
                    </div>
                    <div>
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                        Freya (5% Claim Fee)
                    </label>
                    <input type="number" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-400"
                        placeholder="0"
                        pattern="\d*"
                        onInput={ ( e ) => handleFreyaNodes( e.target.value ) }/>
                    </div>
                    <div>
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                        Thor (8% Claim Fee)
                    </label>
                    <input type="number" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-400"
                        placeholder="0"
                        pattern="\d*"
                        onInput={ ( e ) => handleThorNodes( e.target.value ) }/>
                    </div>
                    <div>
                    <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4">
                        Odin (10% Claim Fee)
                    </label>
                    <input type="number" 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-400"
                        placeholder="0"
                        pattern="\d*"
                        onInput={ ( e ) => handleOdinNodes( e.target.value ) }/>
                    </div>
                </div>
                <p className="text-white pt-10 text-left leading-10">You're currently earning <span className="rounded-r-lg rounded-l-lg bg-amber-400 p-2 ml-2">{dailyRewards.toFixed(3)}</span> Thor per 24 hours. This is equal to <span className="rounded-r-lg rounded-l-lg bg-amber-400 p-2 ml-2">${(dailyRewards * thorPrice).toFixed(2)}</span> USD per day, before claim fees.</p>
                <hr className="mt-10 mb-10"/>
                <p className="text-white text-left">This calculator gives you an idea of what it would look like for you to either taking some passive income or to compound. Above, you see what you're making per day. Let's select a larger time frame and see what you can do.</p>
                
                <div className="mt-20">
                <fieldset className="space-y-6">
                <div className="grid sm:grid-cols-6 gap-6">
                <label for="one-day" className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                    <span className="font-semibold text-gray-500 leading-tight uppercase mb-3 text-center">1 Day</span>
                    <input type="radio" name="plan" id="one-day" value="1" className="absolute h-0 w-0 appearance-none" onChange={ ( e ) => handleActionDays( e.target.value ) }/>
                    <span aria-hidden="true" className="hidden absolute inset-0 border-2 border-amber-500 bg-amber-200 bg-opacity-10 rounded-lg">
                    <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-amber-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber-600">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    </span>
                </span>
                </label>

                <label for="seven-day" className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                <span className="font-semibold text-gray-500 leading-tight uppercase mb-3 text-center">7 Days</span>
                    <input type="radio" name="plan" id="seven-day" value="7" className="absolute h-0 w-0 appearance-none"  onChange={ ( e ) => handleActionDays( e.target.value ) }/>
                    <span aria-hidden="true" className="hidden absolute inset-0 border-2 border-amber-500 bg-amber-200 bg-opacity-10 rounded-lg">
                        <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-amber-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber-600">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        </span>
                    </span>
                </label>
                <label for="thirty-day" className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                    <span className="font-semibold text-gray-500 leading-tight uppercase mb-3 text-center">30 Days</span>
                    <input type="radio" name="plan" id="thirty-day" value="30" className="absolute h-0 w-0 appearance-none"  onChange={ ( e ) => handleActionDays( e.target.value ) }/>
                    <span aria-hidden="true" className="hidden absolute inset-0 border-2 border-amber-500 bg-amber-200 bg-opacity-10 rounded-lg">
                        <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-amber-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber-600">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        </span>
                    </span>
                </label>
                <label for="ninety-day" className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                    <span className="font-semibold text-gray-500 leading-tight uppercase mb-3 text-center">90 Days</span>
                    <input type="radio" name="plan" id="ninety-day" value="90" className="absolute h-0 w-0 appearance-none"  onChange={ ( e ) => handleActionDays( e.target.value ) }/>
                    <span aria-hidden="true" className="hidden absolute inset-0 border-2 border-amber-500 bg-amber-200 bg-opacity-10 rounded-lg">
                        <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-amber-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber-600">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        </span>
                    </span>
                </label>
                <label for="one-eighty" className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                    <span className="font-semibold text-gray-500 leading-tight uppercase mb-3 text-center">180 Days</span>
                    <input type="radio" name="plan" id="one-eighty" value="180" className="absolute h-0 w-0 appearance-none"  onChange={ ( e ) => handleActionDays( e.target.value ) }/>
                    <span aria-hidden="true" className="hidden absolute inset-0 border-2 border-amber-500 bg-amber-200 bg-opacity-10 rounded-lg">
                        <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-amber-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber-600">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        </span>
                    </span>
                </label>
                <label for="three-sixty-five" className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                    <span className="font-semibold text-gray-500 leading-tight uppercase mb-3 text-center">365 Days</span>
                    <input type="radio" name="plan" id="three-sixty-five" value="365" className="absolute h-0 w-0 appearance-none"  onChange={ ( e ) => handleActionDays( e.target.value ) }/>
                    <span aria-hidden="true" className="hidden absolute inset-0 border-2 border-amber-500 bg-amber-200 bg-opacity-10 rounded-lg">
                        <span className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-amber-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber-600">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        </span>
                    </span>
                </label>
            </div>
            </fieldset>
            
                </div>

            {/* { ((actionDays > 0) && (heimdallNode > 0 || freyaNode > 0 || thorNode > 0 || odinNode > 0)) && 
                <p className="text-white text-left mt-5">In {actionDays} days, you'll have: </p>
            } */}
            <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            { heimdallNode > 0 && 
                <div className="mt-10">
                    <div className="p-6 md:max-w-sm bg-gray-800 rounded-lg border border-gray-700 shadow-md hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Your Heimdall Nodes</h5>
                        <p className="font-normal text-gray-400">{((heimdallNode * hemidalRewards) * actionDays).toFixed(3)} Thor Rewards / ${ (((heimdallNode * hemidalRewards)* thorPrice) - (((heimdallNode * hemidalRewards)* thorPrice) * heimdalTax / 100)).toFixed(2) } after Claim Tax.</p>
                            {
                                ((heimdalCost / (heimdallNode * hemidalRewards))  > actionDays) && 
                                <p className="font-normal text-gray-700 mt-2">You need an additional { (heimdalCost/ (heimdallNode * hemidalRewards) - actionDays).toFixed(2)} days to compound into another Heimdall Node.</p>
                                 
                            }    
                        
                            {
                                ((heimdalCost / (heimdallNode * hemidalRewards)) <= actionDays ) && 
                                <p className="font-normal text-amber-200 mt-2">You have enough Thor from this node to compound into another Heimdall Node.</p>
                            }
                    </div>
                </div>
            }

            { freyaNode > 0 && 
                <div className="mt-10">
                    <div className="p-6 md:max-w-sm bg-gray-800 rounded-lg border border-gray-700 shadow-md hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Your Freya Nodes</h5>
                        <p className="font-normal text-gray-400">{((freyaNode * freyaRewards) * actionDays).toFixed(3)} Thor Rewards / ${ (((freyaNode * freyaRewards)* thorPrice) - (((freyaNode * freyaRewards)* thorPrice) * freyaTax / 100)).toFixed(2) } after Claim Tax.</p>
                            {
                                ((freyaCost/ (freyaNode * freyaRewards))  > actionDays) && 
                                <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">You need an additional { (freyaCost / (freyaNode * freyaRewards) - actionDays).toFixed(2)} days to compound into another Freya Node.</p>
                                
                            }    
                        
                            {
                                ((freyaCost/ (freyaNode * freyaRewards)) <= actionDays ) && 
                                <p className="font-normal text-amber-200 mt-2">You have enough Thor from this node to compound into another Freya Node.</p>
                            }
                    </div>
                </div>
            }
            
            { thorNode > 0 && 
                <div className="mt-10">
                    <div className="p-6 md:max-w-sm bg-gray-800 rounded-lg border border-gray-700 shadow-md hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Your Thor Nodes</h5>
                        <p className="font-normal text-gray-400">{((thorNode * thorRewards) * actionDays).toFixed(3)} Thor Rewards / ${ (((thorNode * thorRewards)* thorPrice) - (((thorNode * thorRewards)* thorPrice) * thorTax / 100)).toFixed(2) } after Claim Tax.</p>
                            {
                                ((thorCost / (thorNode * thorRewards))  > actionDays) && 
                                <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">You need an additional { (thorCost / (thorNode * thorRewards) - actionDays).toFixed(2)} days to compound into another Thor Node.</p>
                                
                            }    
                        
                            {
                                ((thorCost / (thorNode * thorRewards)) <= actionDays ) && 
                                <p className="font-normal text-amber-200 mt-2">You have enough Thor from this node to compound into another Thor Node.</p>
                            }
                    </div>
                </div>
            }

            { odinNode > 0 && 
                <div className="mt-10">
                    <div className="p-6 md:max-w-sm bg-gray-800 rounded-lg border border-gray-700 shadow-md hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Your Odin Nodes</h5>
                        <p className="font-normal text-gray-400">{((odinNode * odinRewards) * actionDays).toFixed(3)} Thor Rewards / ${ (((odinNode * odinRewards)* thorPrice) - (((odinNode * odinRewards)* thorPrice) * odinTax / 100)).toFixed(2) } after Claim Tax.</p>
                            {
                                ((odinCost / (odinNode * odinRewards))  > actionDays) && 
                                <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">You need an additional { (odinCost / (odinNode * odinRewards) - actionDays).toFixed(2)} days to compound into another Odin Node.</p>
                                
                            }    
                        
                            {
                                ((odinCost / (odinNode * odinRewards)) <= actionDays ) && 
                                <p className="font-normal text-amber-200 mt-2">You have enough Thor from this node to compound into another Odin Node.</p>
                            }
                    </div>
                </div>
            }
            </div>
            <h3 className="text-lg mt-20 text-gray-400">[RoT, Compounding and reward taking still in the works]</h3>
            
            
            

            </div>

            <Footer />
        </div>
    </>
  );
}

export default App;
