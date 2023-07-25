"use client"
import './globals.css'
import React from "react"
import { Inter } from 'next/font/google'

import Prvider from './Redux/Prvider';
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <Prvider>
          <NavBar/>
          {children}
        </Prvider>
       
        </body>
    </html>
  )
}
