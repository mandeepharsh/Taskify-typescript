import { Todo } from "../../model"
import SingleTodo from "../SingleTodo/SingleTodo";
import "./TodoList.css";
import {Droppable} from "react-beautiful-dnd" ;
interface Props  {
 todos : Todo[];
 setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
 completeTodos : Todo[];
 setCompletedTodos :  React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos , setTodos, completeTodos, setCompletedTodos}) => {
  return (
     <div className="container">
      <Droppable droppableId="TodosList">
        { (provided,snapshot) =>(
             <div className={`todos${snapshot.isDraggingOver? `dragactive`: "" }`} ref={provided.innerRef}  {...provided.droppableProps}>
             <span className="todos__heading">Active Task</span>
               {todos.map((task : Todo,index) =>{
               return <SingleTodo task ={task}
               index = {index} 
                                  key={task.id}
                                  todos = {todos}
                                  setTodos = {setTodos}   />
           })}
                 {provided.placeholder}
           </div>
        )}
      </Droppable>
          <Droppable droppableId="TodosRemove">
            {  (provided) =>(
              
      <div className="todos remove" ref={provided.innerRef}  {...provided.droppableProps}>
               <span className="todos__heading">Completed Task</span>
               {completeTodos.map((task : Todo , index) =>{
                return <SingleTodo index ={index}
                                   task ={task} 
                                   key={task.id}
                                   todos = {completeTodos}
                                   setTodos = {setCompletedTodos}   />
            })}
            {provided.placeholder}
          </div>
               )  }
     </Droppable>
     </div>
    // <div className="todos">
    //   {todos.map((task : Todo) =>{
    //       return <SingleTodo task ={task} 
    //                          key={task.id}
    //                          todos = {todos}
    //                          setTodos = {setTodos}   />
    //   })}
    // </div>
  )
}

export default TodoList
