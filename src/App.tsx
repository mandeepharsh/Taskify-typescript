import { useState } from 'react'
import './App.css'
import InputField from './components/InputField/InputField'
import { Todo } from './model';
import TodoList from './components/TodoList/TodoList';
import {DragDropContext,DropResult} from "react-beautiful-dnd";

const App : React.FC = () =>{
  const [todo ,setTodo] = useState<string>("");
  const [todos,setTodos] = useState<Todo[]>([]);
  const [completeTodos , setCompletedTodos] = useState<Todo[]>([])
  const onChangeHandler : (e: React.ChangeEvent<HTMLInputElement>) => void = (e) =>{
    setTodo(e.target.value)
  }

  const onSumbit :(e:React.FormEvent) => void = (e) =>{
    e.preventDefault();
    if(todo){
      setTodos([...todos,  {
        id : Date.now(),
        todo : todo,
        isDone : false
     }])
       setTodo("")
    }
  }
const onDragEnd = (result: DropResult) =>{
 const {source,destination } = result;

 if(!destination) return;

 if(destination.droppableId === source.droppableId && destination.index === source.index) return;


 let add, 
   active = todos,
   complete = completeTodos;

   if(source.droppableId === "TodosList"){
    add = active[source.index];
    active.splice(source.index,1);
   } else{
    add = complete[source.index];
    complete.splice(source.index,1);
   }

   if(destination.droppableId === "TodosList"){
    active.splice(destination.index, 0, add);
   } else{
    complete.splice(destination.index, 0, add);
   }

   setCompletedTodos(complete);
   setTodos(active);

}

 return <DragDropContext onDragEnd={onDragEnd}>
       <div className="App">
      <span className="heading">Taskify</span>
   <InputField todo = {todo} onChangeHandler={onChangeHandler} onSumbit = {onSumbit}/>
  <TodoList todos ={todos} setTodos = {setTodos} completeTodos={completeTodos} setCompletedTodos={setCompletedTodos}  />
  </div>
  </DragDropContext>
}

export default App
