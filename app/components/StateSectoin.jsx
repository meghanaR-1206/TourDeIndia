import React from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setCount } from '../redux/counter/counterSlice';
gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import { useEffect } from 'react';
const StateSectoin = (data, setLoading ) => {
    const [filejson, setfilejson] = useState(data.data)
    const image = useRef(null)

    const { contextSafe } = useGSAP();

    const animation = contextSafe(() => {
        if(typeof window !== "undefined"){
          if (window.innerWidth < 768) {
            gsap.to(image.current, {
              scale: 1.3, duration: 5
            });
          }
    
          else {
            gsap.to(image.current, {
              y: -90, scale: 1.1, duration: 5
            });
          }
        }
        for (let index = 0; index < 9; index++) {
    
          let scalediv = `#scale${index}`;
          
          ScrollTrigger.create({
            trigger: scalediv,
            start: 'top 60%',
            end: 'top 20%',
            yoyo: true,
            // markers: true,
            scrub: true,
            onLeaveBack: () => {
              gsap.to(scalediv, {
                opacity:0,
                ease: 'power2.out',
              });
            },
            onEnter: () => {
              gsap.to(scalediv, {
                opacity:1,
                y:-40,
                ease: 'power2.out',
              });
            },
            onEnterBack: () => {
                gsap.to(scalediv, {                
                    opacity:1,
                    y:40,
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
          animation();
    
          setfilejson(data.data)
        
          }, [data]);
  const dispatch = useDispatch()

  return (
    <div className='flex flex-col justify-center items-center'>
     
          {filejson.states?.map((item, index) => (
            <Link href="/States" key={index} onClick={() => setLoading(e => !e)} >
              <div id={`scale${index}`} onClick={() => dispatch(setCount(index))} key={index} className={index % 2 ? 'bg-[#351a03] opacity-0 px-2 py-2  rounded-md w-[80vw]   flex justify-around items-center gap-4  m-6 h-fit animates' : 'bg-[#351a03] opacity-0 rounded-md w-[80vw] scalediv m-6 h-fit flex gap-6  justify-around items-center p-2 '}>
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
       </div>
  )
}

export default StateSectoin
