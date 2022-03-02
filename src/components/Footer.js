import React, { useState, useEffect } from 'react'

import {CopyToClipboard} from 'react-copy-to-clipboard';

const Footer = () => {

    const [isCopied, setIsCopied] = useState(false);
    const [walletAddy, setWalletAddy] = useState('0x993319b40aD090F0BEB87450d782Dc6FA54a21F0');

    const handleCopy = () => {
        setIsCopied(true);
        setWalletAddy('Copied!');
        setTimeout(() => {
            setWalletAddy('0x993319b40aD090F0BEB87450d782Dc6FA54a21F0');
        }, 1000);

    }

    return (
        <div className="footer mt-20 py-5 border-t-4 border-gray-500">
            <p className="text-white text-center mb-5">© {(new Date().getFullYear())} - <a href="https://discordapp.com/users/940338219009052712/" className="hover:underline hover:text-amber-400">Ang#3637</a> on Discord.</p>
            <p className="text-white text-center">Find this calculator useful?  I love coffee in the form of crypto! 
            <br/><CopyToClipboard text='0x993319b40aD090F0BEB87450d782Dc6FA54a21F0'
                    onCopy={() => handleCopy()}>
                    <button className="my-2">{ isCopied ? walletAddy : '0x993319b40aD090F0BEB87450d782Dc6FA54a21F0'}
                    </button>
                </CopyToClipboard>
            </p>
            <p className="text-gray-400 text-center"><span className="font-bold">Disclaimer</span> I am not affiliated with Thor in any way. This is a personal project I've created for myself to quickly do Thor calculations and I'm sharing it publicly.</p>
            <p className="text-gray-400 text-center">THOR token price data is being pulled in real-time from CoinGecko.</p>
        </div>
    )
}

export default Footer
