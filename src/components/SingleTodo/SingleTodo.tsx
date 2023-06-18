import { Todo } from "../../model";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import { useEffect, useState,useRef } from "react";
import { Draggable } from 'react-beautiful-dnd';
import "./SingleTodo.css"
interface Props{
    task : Todo;
    todos :  Todo[];
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
    index : number;
}
const SingleTodo: React.FC<Props> = ({task, todos,setTodos, index}) => {
    const [edit, setEdit] =useState<boolean>(false);
    const [editTodo,setEditTodo] = useState<string>(task.todo);
    const handleDone =(id: number) =>{
      setTodos(todos.map((todo)=>  todo.id === id ? {...todo,isDone :!todo.isDone} : todo));
    }
    const handleDelete = (id:number) =>{
        setTodos(todos.filter((todo)=> todo.id !== id ))
    }

    const handleSumbit = (e : React.FormEvent , id : number) =>{
        e.preventDefault()
        setTodos(todos.map((todo) => todo.id === id ? {...todo, todo:editTodo} : todo ));
        setEdit(false)
    }
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        inputRef.current?.focus();
    })
  return (
    <Draggable draggableId={task.id.toString()} index={index} >
      {(provided) =>(
          <form className="todos__single"
           onSubmit={(e) => handleSumbit(e,task.id)}  
           {...provided.draggableProps}
           {...provided.dragHandleProps}
           ref={provided.innerRef}
           
           >
          {
              edit?(
                <input value={editTodo}
                       ref = {inputRef}
                       className="todos__single--text"
                       onChange={(e) =>{
                          setEditTodo(e.target.value)
                       }}             
                />
              ) :(
                      task.isDone ?(
                          <s className="todos__single--text"> {task.todo}</s>
                      ) : (
                          <span className="todos__single--text"> {task.todo}</span>
                      )
              )
          }
         
       
        <div>
          <span className="icon" onClick={() =>{
              if(!edit && !task.isDone){
                  setEdit(!edit)
              }
          }}><AiFillEdit/></span>
          <span className="icon" onClick={() => handleDelete(task.id)}><AiFillDelete/></span>
          <span className="icon" onClick={() => handleDone(task.id)} ><MdDone/></span>
        </div>
      </form>
      )}
   
      </Draggable>

  )
}

export default SingleTodo
