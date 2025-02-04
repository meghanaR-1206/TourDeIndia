"use client"
import React, { useEffect } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Temp from './AiResponse'
gsap.registerPlugin(ScrollTrigger);

const AiSection = () => {
    const { contextSafe } = useGSAP();
    const animation = contextSafe(() => {
        const text = "Hello Nomader! Where do you wanna travel today?";
        if (typeof document != "undefined")
            var headding = document.getElementById("textanim");
        const textArr = text.split("")
        textArr.forEach(item => {
            headding.innerHTML += `<span class="animChar">${item}</span>`
        });
        if (typeof document != "undefined") {
            var message = document.querySelectorAll(".bpMessageBlocksBubble")
            var messageBox = document.querySelectorAll(".para")
        }
        if (message) {
            messageBox.innerHTML = message.innerHTML
        }


        headding.style.opacity = 1;
        
        gsap.from(".animChar", {
            opacity: 0,
            duration: 0.1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".aisec",
              start: "top 85%", 
              onEnter: () => {
                window.scrollTo({
                    top: 770,
                    behavior: 'smooth'
                });
              },
            //   markers: true,                    // Smooth transition when `fixedDiv` unpins
            }
        })
      
    })
    useEffect(() => {
        animation();
    }, [])
    return (
        <div className='  aisec h-[110vh] py-[3rem] backdrop-blur-lg bg-[#00000033]'>
            <h1 id='textanim' className='amsterdam opacity-0 bg-origin-border py-4 text-[#ffd867] mt-50 text-center w-full text-[4rem] mx-auto mt'>

            </h1>
            <div className=' h-fit bg-grday-900 w-screen'>
                <div className="para">
                    <Temp />
                </div>
            </div>
        </div>
    )
}

export default AiSection
