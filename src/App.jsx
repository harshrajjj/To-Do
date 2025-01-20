import { useState,useEffect } from 'react'
import './App.css'
import { Todoprovider } from './context'
import TodoForm from "./components/TodoForm"
import TodoItem from './components/TodoItem'

function App() {
  const [todos,setTodos] = useState([])


  const addTodo = (todo) => {
    setTodos((prev) => [{id:Date.now(),...todo},...prev])
    console.log(todos[0])
  }

  const updateTodo =(id,todo) => {
    setTodos((prev) => prev.map((prevtodo) => (prevtodo.id ===id ? todo:prevtodo) ))
  }

  const deleteTodo = (id) =>{
    setTodos((prev) => prev.filter((todo) => todo.id!=id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevtodo) => // yha pe object m complete likhe hai uske phly spread operetor se prevobject ka element ko spread kie hai to complete likhe hai taki jo spread opereter se complete ka jo valur aaiga wo overwrite ho jaiga 
      prevtodo.id ===id ? {...prevtodo,completed : !prevtodo.completed} :prevtodo
    ))
  }

  // local storage functionality


  //to get teh element from local storage isko use effect m islie likhe hai taki if phly se jo local storage m todo hai usme ko elemetn hai to wo page render hone k saath he load ho jai
  useEffect(() => {
    //jab local storege m store hota hai to ye string k format m store hota hai so uss data ko json m parse karne k lie hum json.parse use karete hai 
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  }, []);



    //for set the elemetn in local storage
  // jo key value jum data dalte samai dale the wahi key ka name chaiye hoga data niklte samai
  useEffect(() => {
    //local storage m element string m store hote hai to hum apna data ko string m convert kar k dal rhe hai local storage mai
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])



  return (
    <Todoprovider value = {{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
            <div className="bg-[#172842] min-h-screen py-8">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                <div className="mb-4">
                     {/* Todo form goes here */} 
                    <TodoForm/>
                </div>
                <div className="flex flex-wrap gap-y-3">
                    {/*Loop and Add TodoItem here */}
                    
                    
                    {todos.map((todo) => (
                      <div key={todo.id } className='w-full'>
                        <TodoItem todo ={todo}/>
                      </div>
                    ) )}
                </div>
            </div>
        </div>
    </Todoprovider>
  )
}

export default App
