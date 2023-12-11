import styles from "./Task.module.css"
import { Trash2, Check } from "lucide-react"
import { LabelHTMLAttributes} from "react"

import { ChangeEvent, useState } from "react"

interface TaskProps extends LabelHTMLAttributes<HTMLLabelElement> {
  task: Task;
  handleDeleteTask: (id: number) => void;
  handleCheckTask: (isChecked: boolean) => void;
}

interface Task {
  id: number;
  content: string;
}

export function Task({ task, handleDeleteTask, handleCheckTask }: TaskProps){
  const [isChecked, setIsChecked] = useState(false)
  
  function handleTaskIsChecked(event: ChangeEvent<HTMLInputElement>){
    setIsChecked(event.target.checked) 
  }

  return(
    <div className={styles.task}>
      <div className={styles.checkbox}>
        <input 
          type="checkbox" 
          id={task.id.toString()}
          onChange={handleTaskIsChecked}
          onClick={() => handleCheckTask(!isChecked)}
        />
        <label htmlFor={task.id.toString()}>
          <Check size={12}/>
        </label>
      </div>
      <p className={isChecked ? styles.isChecked : "none"}>{task.content}</p>
      <button
        type="button"
        onClick={() => handleDeleteTask(task.id)}
      >
        <Trash2 size={16}/>
      </button>
    </div>
  )
}