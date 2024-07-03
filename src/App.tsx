import { useState } from 'react';

export default function App() {
  const [list, setList] = useState<{taskName: string, completed: boolean}[]>([])
  const [newTaskName, setNewTaskname] = useState<string>('New Task')

  const taskList = list.map((l,i) => (
    <ListItem
      key={i}
      taskName={l.taskName}
      isCompleted={l.completed}
      handleStatusChange={() => setList([...list.slice(0, i), {taskName: l.taskName, completed: !l.completed},...list.slice(i+1)])}
      handleDelete={() => setList([...list.slice(0, i), ...list.slice(i+1)])}
    />
  ))
  return (
    <div>
      <button 
          type='button' 
          onClick={() => {setList(list.filter((l) => !l.completed))}}
        >
          Delete Completed
        </button>
      {taskList}
      <div style={{display: 'flex'}}>
        <button 
          type='button' 
          onClick={() => {setList([...list, {taskName: newTaskName, completed: false}])}}
        >
          +
        </button>
        <input type='text' value={newTaskName} onChange={(e) => setNewTaskname(e.target.value)}/>
      </div>
    </div>
  );
}

function ListItem({ 
  taskName,
  isCompleted,
  handleStatusChange,
  handleDelete,
} : { 
  taskName: string
  isCompleted: boolean
  handleStatusChange: () => void,
  handleDelete: () => void
}) {
  return (
    <div style={{display: 'flex'}}>
      <button type='button' onClick={handleDelete}>X</button>
      <input type='checkbox' checked={isCompleted} onChange={handleStatusChange}/>
      <div style={{textDecoration: isCompleted ? 'line-through' : 'none'}}>{taskName}</div>
    </div>
  );
}