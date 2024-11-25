import React, { useState, useEffect, useRef } from "react";
import { Slide } from "react-slideshow-image";
import Image from "next/image";
import { FaMapMarkedAlt } from "react-icons/fa";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import "react-slideshow-image/dist/styles.css";
import { fireDB } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const SliderComponent = () => {
  const [filejson, setfilejson] = useState({});
  const [hover, setHover] = useState(false);
  const [map, setmap] = useState(false);
  const [FetchData, setFetchData] = useState(true);

  // Fetch data from Firestore
  const dataFetch = async () => {
    try {
      let x = await getDocs(collection(fireDB, "jsonData"));
      setfilejson(x.docs[1].data()); // Fetch second document
      setFetchData(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const slide = useRef();
  const count = useSelector((state) => state.counter.value);

  // Slideshow properties
  const zoomInProperties = {
    duration: hover ? 30000000 : 3043300,
    transitionDuration: 500,
    indicators: true,
    arrows: true,
    prevArrow: (
      <div style={{ width: "30px", marginRight: "-10px", cursor: "pointer" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#2e2e2e">
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </div>
    ),
    nextArrow: (
      <div style={{ width: "30px", marginLeft: "-10px", cursor: "pointer" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#2e2e2e">
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </div>
    ),
  };

  return (
    <>
      {FetchData ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="flex justify-center items-center cursor-default mx-4">
          <div ref={slide} className="w-full">
            <Slide {...zoomInProperties}>
              {filejson?.states[count]?.placesToVisit.map((each, index) => (
                <div
                  key={index}
                  className="relative flex flex-col md:flex-row h-auto items-center mx-auto gap-5 p-4 border border-[#5e1e0b] rounded-lg bg-[#1e0700] w-full md:w-[75vw]"
                >
                  {/* Left Section: Image */}
                  <div className="flex-shrink-0 w-full md:w-[40%]">
                    <Image
                      src={each.imageurl}
                      alt={each.placeName}
                      loading="lazy"
                      width={600}
                      height={400}
                      className="object-cover rounded-md h-[30vh] md:h-[40vh] w-full"
                    />
                  </div>

                  {/* Right Section: Text */}
                  <div className="flex flex-col justify-center gap-4 p-4 w-full md:w-[60%]">
                    <h2 className="text-xl md:text-2xl font-bold text-orange-500 text-center md:text-left">
                      {each.placeName}
                    </h2>
                    <p className="text-sm md:text-lg text-white leading-relaxed">
                      {each.desc}
                    </p>
                    <button
                      onClick={() => setmap((prev) => !prev)}
                      className="self-start mt-2 p-2 text-white bg-orange-500 hover:bg-orange-700 rounded-md"
                    >
                      <FaMapMarkedAlt className="inline-block mr-2" />
                      {map ? "Hide Map" : "Show Map"}
                    </button>
                  </div>

                  {/* Map Modal */}
                  <div
                    className={`${
                      map ? "absolute" : "hidden"
                    } flex justify-center items-center top-0 left-0 z-[10] bg-black bg-opacity-50 h-screen w-screen`}
                    dangerouslySetInnerHTML={{ __html: each.map }}
                  ></div>
                </div>
              ))}
            </Slide>
          </div>
        </div>
      )}
    </>
  );
};

export default SliderComponent;
