import React from 'react'

const Footer = () => {
    return (
        <div className="footer mt-20 py-5 border-t-4 border-gray-500">
            <p className="text-white text-center">© {(new Date().getFullYear())} - <a href="https://discordapp.com/users/940338219009052712/" className="hover:underline hover:text-amber-400">Ang#3637</a> on Discord.</p>
            <p className="text-gray-400 text-center"><span className="font-bold">Disclaimer</span> I am not affiliated with Thor in any way. This is a personal project I've created for myself to quickly do Thor calculations and I'm sharing it publicly.</p>
        </div>
    )
}

export default Footer
