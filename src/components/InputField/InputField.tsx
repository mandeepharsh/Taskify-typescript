import "./InputField.css"
import {useRef} from "react";
interface Props{
    todo : string;
    onChangeHandler : (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSumbit : (e:React.FormEvent) => void;
}

const InputField :React.FC<Props> = ({todo, onChangeHandler,onSumbit}) => {
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form   className="input"
            onSubmit={(e) =>{onSumbit(e);
                            inputRef.current?.blur()} }>
      <input type="input"
             placeholder="Enter a task"
             value={todo}
             className="input__box"
             onChange={onChangeHandler}
      />  
      <button className="input_submit">Go</button>
    </form>
  )
}

export default InputField
