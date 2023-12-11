import styles from "./App.module.css"

import { Task } from "./components/Task"

import { FormEvent, useState } from "react"

import logo from "./assets/Logo.svg"
import { ClipboardEdit, PlusCircle } from "lucide-react"

export function App(){
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState<{ id: number; content: string }[]>([])
  const [taskCount, setTaskCount] = useState(0)
  const [taskCompleted, setTaskCompleted] = useState(0)

  function handleCreateNewTask(event: FormEvent){
    event.preventDefault()
    
    if(newTask.length === 0){
      alert("Insira uma task a ser feita!")
    } else {
      setTasks(prevState => [...prevState, { id: randomNumber, content: newTask }])
      setTaskCount(prevState => prevState + 1)
  
      setNewTask("")
    }
  }

  function handleDeleteTask(id: number){
    const taskDeleted = tasks.filter(task => { return task.id !== id})

    setTaskCount(prevState => prevState - 1)
    
    if(taskCompleted !== 0){
      setTaskCompleted(prevState => prevState - 1)
    }  

    setTasks(taskDeleted)
  }

  function handleCheckTask(isChecked: boolean){
    if(isChecked){
      setTaskCompleted(prevState => prevState + 1)
    } else if(!noHaveTasksCompleted){
      setTaskCompleted(prevState => prevState - 1)
    }
  }

  const tasksIsEmpty = tasks.length === 0
  const noHaveTasksCompleted = taskCompleted === 0
  const randomNumber = Math.random()

  return(
    <div>
      <header className={styles.header}>
        <img src={logo} alt="" />
      </header>

      <main className={styles.content}>
        <form className={styles.newTask}>
          <input 
            type="text"
            value={newTask}
            placeholder="Adicione uma nova tarefa"
            onChange={e => setNewTask(e.target.value)}
          />
          <button 
            type="submit"
            onClick={handleCreateNewTask}
          >
            Criar <PlusCircle size={16}/>
          </button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.info}>
            <strong>
              Tarefas criadas
              <span>{taskCount}</span>
            </strong>
            <strong>
              Concluídas
              { noHaveTasksCompleted && taskCount === 0 ? 
                <span>{taskCompleted}</span>
                :
                <span>{taskCompleted} de {taskCount}</span>                
              }
            </strong>
          </div>
          {
            tasksIsEmpty ? 
              <div className={styles.empty}>
                  <ClipboardEdit size={56}/>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <p>Crie tarefas e organize seus itens a fazer</p>
              </div> :
              tasks.map((task, index) => (
                <Task 
                  key={index}
                  task={task}
                  handleDeleteTask={handleDeleteTask}
                  handleCheckTask={handleCheckTask}
                /> 
              ))
          }
        </div>
      </main>
    </div>
  )
}