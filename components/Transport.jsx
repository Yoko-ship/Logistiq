'use client'

import React from "react";
import classes from "./map.module.css";
import { useSelector } from "react-redux";
import { transports } from "@/data/cities";
function Transport() {
    const road = useSelector((state) => state.city.road);


    return (
    <>
        {road.map((route,index) =>(
            <p key={index}>{route.x}</p>
        ))}
    </>
  );
}

export default Transport;
