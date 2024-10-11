import React, { useState, useEffect, useRef } from "react";
import { Slide } from "react-slideshow-image";
import Image from "next/image";
import { FaMapMarkedAlt } from "react-icons/fa";
import Loader from "./Loader";
import { useSelector, useDispatch } from 'react-redux'
import "react-slideshow-image/dist/styles.css";
import { duration } from "@mui/material";
import { fireDB } from '../firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import FetchData from "./Rough";
const SliderComponent = () => {
  const [filejson, setfilejson] = useState({})
  const [hover, setHover] = useState(false);
  const [map, setmap] = useState(false);
  const [FetchData, setFetchData] = useState(true)
  // const map = useRef(null);
  const dataFetch = async () => {
    let x = await getDocs(collection(fireDB, 'jsonData'));
    setfilejson(x.docs[1].data())
    setFetchData(false)
    // setfilejson(jsonfile)
    // setFetchData(false);
  }
  useEffect(() => { dataFetch() }, [])

  const handleMapIconClick = () => {
    if (map.current) {
      map.current.style.display = map.current.style.display === "block" ? "none" : "block";
      console.log('yes')
      console.log('map.current.style.display', map.current.style.display)
      console.log('map.current.style.display', map.current)
    }
  };


  const slide = useRef()
  const count = useSelector(state => state.counter.value)

  // console.log('jsonfile.states.Karnataka.placesToVisit', jsonfile.states.Karnataka.placesToVisit);

  const zoomInProperties = {
    duration: hover ? 30000000 : 3043300,
    transitionDuration: 500, // Transition duration between slides in milliseconds
    // infinite: true, // Loop the slides infinitely
    indicators: true, // Show slide indicators
    arrows: true, // Show arrows for navigation
    // autoPlay: false, // Disable auto-play
    indicators: (index) => (
      <div
        key={index}
        className={`indicator ${index === zoomInProperties.currentSlide ? "active" : ""}`}
      />
    ),
    // transitionDuration: 1000,
    prevArrow: (
      <div style={{ width: "30px", marginRight: "-10px", cursor: "pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#2e2e2e"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </div>
    ),
    nextArrow: (
      <div style={{ width: "30px", marginLeft: "-10px", cursor: "pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#2e2e2e"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </div>
    ),
  };

  return (<>
    {FetchData? <div><Loader/></div> :   <div className="flex  mb-7 lg:my-7 justify-center items-center cursor-default mx-4">
      <div ref={slide} className=" w-full ">
        <Slide {...zoomInProperties}>
          {filejson?.states[count]?.placesToVisit.map((each, index) => (
            <div key={index} className="flex h-[77vh] margin: 0 0 0 59.7rem; items-center w-[80vw] m-auto lg:w-[89vw]  gap-5 mx-11 border border-[#5e1e0b] rounded-lg bg-[#1e0700]" style={{ margin: "auto" }}>

              <div className="flex flex-col  h-full scroll justify-around overflow-scroll gap-3">
                <h2 className="text-2xl h-fit text-center pt-10 font-bold text-[orange]">{each.placeName}</h2>
                <p className="text-xl h-full text-justify  py-6  leading-[2.4rem] overflow-scroll scroll  text-white px-4">

                  <Image src={each.imageurl} loading="lazy" alt={each.placeName} width={1000} height={100} className="object-cover float-left px-4 h-[30vh] lg:h-[100%] pr-7  w-fit" />
              
                   {each.desc}

                </p>
              </div>
              <div className={map ? "absolute flex justify-center items-center  top-34 z-[10] bg-[#000000b8] h-[100vh] w-[100vw] " : "hidden"} dangerouslySetInnerHTML={{ __html: each.map }}></div>
              <button onClick={() => setmap(e => !e)} className=" z-[11] cursor-pointer absolute self-start p-3 flex justify-end itedms-end w-[79vw] lg:w-[89vw] z-100" >
                <FaMapMarkedAlt fill="white" width={2003} className="w-fit  h-[2rem] " />
              </button>
            </div>
          ))}
        </Slide>

      </div>
    </div>}</>
  );
};

export default SliderComponent;
