'use client'

import React, { useState } from 'react'
import classes from "@/app/page.module.css"
import Modal from './Modal'
import { useSelector } from 'react-redux'

function Header() {
  const [isOpen,setIsOpen] = useState(false)
  const money = useSelector((state) => state.city.money)
  

  return (
    <header className={classes.header}>
        <nav>
            <ul>
                <li onClick={() => setIsOpen(!isOpen)}>Заказы</li>
              <li>Деньги {money ? `${money}$`:"" }</li>
            </ul>
        </nav>

        <Modal open={isOpen} setIsOpen={setIsOpen}/>
    </header>
  )
}

export default Header
