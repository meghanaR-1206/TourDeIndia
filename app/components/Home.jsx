"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Stars from "./Stars";
import AiSection from "./AiSection";
import StateSectoin from "./StateSectoin";
import Loader from "./Loader";
import { fireDB } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [filejson, setfilejson] = useState({});
  const [fetchData, setFetchData] = useState(true);
  const [loading, setLoading] = useState(false);
  const image = useRef(null);

  const dataFetch = async () => {
    try {
      const x = await getDocs(collection(fireDB, "jsonData"));
      setfilejson(x.docs[1].data());
      setFetchData(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { contextSafe } = useGSAP();

  const animation = contextSafe(() => {
    if (typeof window !== "undefined") {
      gsap.to(image.current, {
        scrollTrigger: {
          trigger: image.current,
          start: "top 4rem",
          end: "top 9rem",
          pin: true,
          pinSpacing: false,
        },
      });
    }
  });

  useEffect(() => {
    animation();
  }, [filejson]);

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {fetchData ? (
        <div className="fixed flex z-10 h-screen w-screen bg-[#381a05ad]">
          <Loader />
        </div>
      ) : (
        <>
          {loading && (
            <div className="fixed flex z-10 h-screen w-screen bg-[#381a05ad]">
              <Loader />
            </div>
          )}

          {/* Background Image Section */}
          <div
            ref={image}
            className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden"
          >
            <Image
              src="/images/homeImg.jpg"
              alt="Background"
              layout="fill"      // Ensures the image fills the container
              objectFit="cover"  // Ensures the image covers the entire container without distortion
              className="w-full h-full"
            />
          </div>

          {/* AI and Stars Section */}
          <section className="px-4 md:px-8 lg:px-16">
            <AiSection />
            <Stars />
          </section>

          {/* States Section */}
          <h1 className="text-center py-4 text-[#ffd867] text-4xl md:text-5xl lg:text-6xl font-bold mt-12 mx-auto">
            STATES
          </h1>
          <StateSectoin data={filejson} />
        </>
      )}
    </div>
  );
};

export default Home;
