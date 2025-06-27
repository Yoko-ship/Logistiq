'use client'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import classes from "./modal.module.css"
import { routes } from '@/data/orders'
import { useSelector,useDispatch } from 'react-redux'
import { toast,ToastContainer } from 'react-toastify'
import { addMoney,addTransport } from '@/store/cities'
import { transports } from '@/data/cities'
import 'react-toastify/dist/ReactToastify.css'
function Modal({open,setIsOpen}) {
    const [mounted,setMounter] = useState(false)
    const dispatch = useDispatch()
    const road = useSelector((state) => state.city.road)



    useEffect(()=>{
        setMounter(true)
    },[])

    const acceptOrder = (id)=>{
        const selectedById = routes.filter(route => route.id === id)
        const routeFrom = selectedById[0].from
        const routeTo = selectedById[0].to
        const roadCoordinate = road.find(route => route.name === routeFrom && route.name2 === routeTo)
        if(roadCoordinate){
            const transported = transports[0]
            Object.assign(transported,{
                x1:roadCoordinate.x1,
                y1:roadCoordinate.y1,
                x2:roadCoordinate.x2,
                y2:roadCoordinate.y2
            })
            //TODO here
            dispatch(addTransport(transported))
        }
        const isThereRoadFrom = road.find(route => route.name === routeFrom) !== undefined
        const isThereRoadTo = road.find(route => route.name2 === routeTo) !== undefined
        if(!isThereRoadFrom || !isThereRoadTo){
            toast.error("Маршрут не соответствует заказу")
        }
        else{
            toast.success("Вы успешно доставили товар")
            const money = selectedById[0].price
            dispatch(addMoney(money))
            
            
        }
        
    }

    if(!mounted) return
  return createPortal(
    <>
    <div className={open ? classes.backdrop : undefined}></div>
        <dialog open={open} className={classes.dialog}>
            <section>
                <button onClick={() => setIsOpen(false)} className={classes.close}>❌</button>
            </section>
            
            <section className={classes.lists}>
                {routes.map((route,index) =>(
                    <div className={classes.grid} key={index}>
                    <p>Откуда:{route.from}</p>
                    <p>Куда:{route.to}</p>
                    <p>Оплата:{route.price}</p>
                    <p>Время:{route.duration}</p>
                    <button onClick={() => acceptOrder(route.id)}>Принять</button>
                    </div>
                ))}
            </section>
        </dialog>
        <ToastContainer position="bottom-right" />
    </>,document.querySelector("#modal")
    
  )
}

export default Modal