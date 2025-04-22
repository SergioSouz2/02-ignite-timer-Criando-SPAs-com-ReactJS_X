import { useContext } from "react";
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../../../../context/CycleContext";



export function NewCycleForm() {
   const { activeCycle,cycles  } = useContext(CycleContext)

   const {register} = useFormContext()


   return (
      <FormContainer>
         <label htmlFor="task">Vou trabalhar em</label>
         <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para seu Projeto"
            disabled={!!activeCycle}
            {...register('task')}
         />

         <datalist id="task-suggestions">
            {
               cycles.map((cycle) => (
                  <option key={cycle.id} value={cycle.task}></option>
               ))
            }
         </datalist>

         <label htmlFor="minutesAmount">durante</label>
         <MinutesAmountInput
            type="number"
            step={5}
            min={5}
            max={60}
            id="minutesAmount"
            placeholder="00"
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
         />

         <span>minutos.</span>
      </FormContainer>
   )
}