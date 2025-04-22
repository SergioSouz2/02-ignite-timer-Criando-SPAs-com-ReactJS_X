import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {  addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";


interface CreateCycleData {
   task: string;
   minutesAmount: number;
}

interface CycleContextType {
   cycles: Cycle[];
   amountSecondsPassed: number;
   activeCycleId: string | null;
   activeCycle: Cycle | undefined;
   setSecondsPassed: (seconds: number) => void
   markCurrentCycleAsFinished: () => void
   createNewCycle: (data: CreateCycleData) => void
   interruptCurrentCycle: () => void
}

interface CycleContextProviderProps {
   children: ReactNode
}

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
   const [cyclesState, dispatch] = useReducer(cyclesReducer, {
      cycles: [],
      activeCycleId: null
   },

      (initialState) => {
         const storedStateAsJSON = localStorage.getItem(
            '@ignite-timer:cycles-state-1.0.0',
         )
         if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
         }

         return initialState

      }
   )

   const { cycles, activeCycleId } = cyclesState;
   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

   const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {

      if(activeCycle){
         return differenceInSeconds(
            new Date(),
            new Date(activeCycle.startData)
         )
      }
      return 0
   });

   useEffect(() => {
      const stateJSON = JSON.stringify(cyclesState)
      localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
   }, [cyclesState])




   function setSecondsPassed(seconds: number) {
      setAmountSecondsPassed(seconds)
   }

   function markCurrentCycleAsFinished() {
      dispatch(markCurrentCycleAsFinishedAction)
   }

   function createNewCycle(data: CreateCycleData) {

      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount,
         startData: new Date()

      }

      dispatch(addNewCycleAction(newCycle))
      setAmountSecondsPassed(0)
   }

   function interruptCurrentCycle() {

      dispatch(interruptCurrentCycleAction())

   }

   return (
      <CycleContext.Provider
         value={{
            cycles,
            activeCycle,
            activeCycleId,
            createNewCycle,
            setSecondsPassed,
            amountSecondsPassed,
            interruptCurrentCycle,
            markCurrentCycleAsFinished,
         }}>
         {children}
      </CycleContext.Provider>
   )
}