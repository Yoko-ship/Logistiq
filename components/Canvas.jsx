"use client";
import React, { useEffect, useState } from "react";
import { cities } from "@/data/cities";
import classes from "./map.module.css";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { addRoad } from "@/store/cities";

function Canvas() {
  const dispatch = useDispatch();
  const [selectedCities, setSelectedCities] = useState([]);
  const road = useSelector((state) => state.city.road)
  const [from, to] = selectedCities;

  const handleSelected = (city) => {
    if (selectedCities.length <= 1) {
      setSelectedCities((prevCity) => {
        if (prevCity[0]?.name !== city.name) {
          return [...prevCity, city];
        }

        return [];
      });
    }
  };


  useEffect(() => {
    if (selectedCities.length === 2) {
      const isDublicate = road.some(
        (r) =>
          (r.name === from.name && r.name2 === to.name) ||
          (r.name === to.name && r.name2 === from.name)
      );

      if (!isDublicate) {
        dispatch(
          addRoad({
            x1: from.x,
            x2: to.x,
            y1: from.y,
            y2: to.y,
            name: from.name,
            name2: to.name,
          })
        );
        setSelectedCities([]);
      }
      else{
        setSelectedCities([])
      }
    }
  }, [selectedCities]);

  return (
    <div className={classes.map}>
      <svg className={classes.road}>
        {road.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="blue"
            strokeWidth={2}
          ></line>
        ))}
      </svg>
      {cities.map((city) => (
        <div
          key={city.id}
          className={
            road.some(
              (selected) =>
                selected.name === city.name || selected.name2 === city.name
            )
              ? classes.test
              : classes.city
          }
          style={{
            left: city.x,
            top: city.y,
            backgroundImage: "url(/buildings.png)",
          }}
          data-name={city.name}
          onClick={() => handleSelected(city)}
        ></div>
      ))}
      <Modal />
    </div>
  );
}

export default Canvas;
