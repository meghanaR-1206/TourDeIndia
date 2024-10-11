"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useState } from 'react'
import Background from "../../public/images/homeImg.jpg"
import { useDispatch } from 'react-redux'
import Rough from './Rough'
import Loader from './Loader'
// import filejson from '../../public/json.json'
import { fireDB } from '../firebase/firebaseConfig'
import { gsap } from 'gsap';
import Link from 'next/link'
import { collection, getDocs } from 'firebase/firestore'
import { setCount } from '../redux/counter/counterSlice';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useGSAP } from '@gsap/react'

const Home = () => {
  const image = useRef(null)
  const [filejson, setfilejson] = useState({})
  const [Loading, setLoading] = useState(false)
  const [fetchData, setFetchData] = useState(true)
  const dataFetch = async () => {
    let x = await getDocs(collection(fireDB, 'jsonData'));
    setfilejson(x.docs[1].data())
    setFetchData(false)
  }
  const { contextSafe } = useGSAP();
  const animation = contextSafe(() => {
    if(window.innerWidth < 768){
        gsap.to(image.current, {
           scale:1.3, duration: 5
        });
      }
      else{
        gsap.to(image.current, {
          y: -90,scale:1.1, duration: 5
        });
      }
        for (let index = 0; index < 9; index++) {
            let scalediv = `#scale${index}`;
            let x = scalediv + " .textdiv";
            ScrollTrigger.create({
            trigger: scalediv,
            start: 'top center',
            end: 'top 20%',
            yoyo: true,
            scrub: true,
            onLeaveBack: () => {
              gsap.to(scalediv, {
              scale: 1,
              ease: 'power2.out',
              });
            },
            onEnter: () => {
              gsap.to(scalediv, {
              scale: 1.2,
              ease: 'power2.out',
              });
            },
            onEnterBack: () => {
              gsap.to(scalediv, {
              scale: 1.2,
              ease: 'power2.out',
              });
            },
            onLeave: () => {
              gsap.to(scalediv, {
              scale: 1,
              ease: 'power2.out',
              });
            }
            });
        }
  });
  
  useEffect(() => {
    
    if (!fetchData) {
      animation();
    }
    
  }, [fetchData]);
  useEffect(() => { dataFetch() }, [])
  const dispatch = useDispatch()
  return (
    <div className='min-h-[150vh] min-w-screen '> {fetchData ? <div className='flex fixed  z-10 h-screen w-screen bg-[#381a05ad]'>
      < Loader />
    </div > :
      <>{Loading && <div className='flex fixed  z-10 h-screen w-screen bg-[#381a05ad]'>
        < Loader />
      </div >}
        <div ref={image} className=' h-[calc(100%-4rem)] overflow-hidden flex items-center'>
          <Image src={Background} width={"100%"} height={"80vh"} />
        </div>
        <h1 className='amsterdam bg-origin-border py-4 text-[#ffd867] mt-50 text-center w-full text-[6rem] mx-auto mt'>
               STATES
              </h1>
        <div className='flex flex-col justify-center items-center'>
          {filejson.states?.map((item, index) => (
            <Link href="/States" key={index} onClick={() => setLoading(e => !e)} >
              <div id={`scale${index}`} onClick={() => dispatch(setCount(index))} key={index} className={index % 2 ? 'bg-[#351a03] px-2 py-2  rounded-md w-[80vw]   flex justify-around items-center gap-4  m-6 h-fit animates' : 'bg-[#351a03] rounded-md w-[80vw] scalediv m-6 h-fit flex gap-6  justify-around items-center p-2 '}>
                <Image loading='lazy' src={item.PortraitImg} alt={`${item.state} portrait`} width={200} height={300} className=' h-[10rem]' />
                <div className='flex justify-around text-2xl h-full gap-3 text-center flex-col'>
                  <h2 className='text-yellow-400 textdiv text-3xl font-bold '>
                    {item.state}
                  </h2>
                  <p className='text-sm lg:text-xl'>
                    {item.description}
                  </p>
                  <h3 className='text-end w-full text-lg'>Explore {item.state} here...</h3>
                </div>
              </div>
            </Link>
          ))}
{/* <Rough/> */}
        </div>
      </>
    }</div>
  )
}

export default Home
