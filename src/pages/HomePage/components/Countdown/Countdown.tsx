import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "../../../../context/CycleContext";

export function Countdown() {

   const { 
      activeCycle, 
      activeCycleId, 
      markCurrentCycleAsFinished,
      amountSecondsPassed,
      setSecondsPassed
   } = useContext(CycleContext)

   const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
   const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

   const minutesAmount = Math.floor(currentSeconds / 60)
   const secondsAmount = currentSeconds % 60

   const minutes = String(minutesAmount).padStart(2, '0')
   const seconds = String(secondsAmount).padStart(2, '0')


   useEffect(() => {
      let interval: number;

      if (activeCycle) {
         interval = setInterval(() => {
            const secondsDifference = differenceInSeconds(
               new Date(),
               new Date(activeCycle.startData)
            )

            if (secondsDifference >= totalSeconds) {
               markCurrentCycleAsFinished()
               setSecondsPassed(totalSeconds)
               // handleInterruptCycle()
               clearInterval(interval)
            } else {
               setSecondsPassed(secondsDifference)
            }
         }, 1000)
      }
      return () => {
         clearInterval(interval)
      }
   }, [activeCycle, totalSeconds, activeCycleId])

 

   useEffect(() => {
      if (activeCycle) {

         document.title = `${minutes}:${seconds}`
      }
   }, [minutes, seconds, activeCycle])

   return (
      <CountdownContainer>
         <span>{minutes[0]}</span>
         <span>{minutes[1]}</span>
         <Separator>:</Separator>
         <span>{seconds[0]}</span>
         <span>{seconds[1]}</span>
      </CountdownContainer>
   )
}