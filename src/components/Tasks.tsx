import { PlusCircle, Trash } from '@phosphor-icons/react';
import styles from './Tasks.module.css';
import {ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


interface TasksProps {
	id: string;
	content: string;
	isTaskComplete: boolean;
}

const Tasks = () => {
	const [tasks, setTasks] = useState<TasksProps[]>([])
	const [newTask, setNewTask] = useState('')
	const [tasksCompleted, setTasksCompleted] = useState<TasksProps[]>([])
	const [isTaskComplete, setIsTaskComplete] = useState(false)
	const [onSelectTask, setOnSelectTask] = useState('')
	const [isChecked, setIsChecked] = useState(false)
	

	function handleAddTask(event: FormEvent){
		event.preventDefault();
		const newTaskCreated = { content: newTask, isTaskComplete, id: uuidv4() }
		setTasks([...tasks, newTaskCreated])
		setNewTask('')
		console.log(tasks);
	}

	function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
		setNewTask(event.target.value)
	}

	function handleDeleteTask(taskToDelete: TasksProps){
		const tasksOnList = tasks.filter((task) => {
			return task !== taskToDelete
		})
		setTasks(tasksOnList)
	}

	function handleCheckBox(){
		setIsChecked(!isChecked)

	}

	function handleCompleteTheTask(id: string){
		setOnSelectTask(id)
		const taskDone = tasks.map( task => {
			if( task.id === id ) {
				return {
					...task,
					isTaskComplete: !task.isTaskComplete
				}
			}
			return task
		})
		setTasksCompleted(taskDone)
		console.log(taskDone);
		
	}

	return (
		<div className={styles.tasks}>
			<form onSubmit={handleAddTask} className={styles.taskInput}>
				<input value={newTask} onChange={(handleNewTaskChange)} type="text" placeholder="Add a new task" />
				<button type='submit' >
					Add
					<PlusCircle size={16} />
				</button>
			</form>

			<div className={styles.tasksCreatedBox}>
				<div className={styles.taskHeader}>
					<div className={styles.taskQuantaty}>
						<p>Tasks created</p>
						<span>{tasks.length}</span>
					</div>
					<div className={styles.tasksDone}>
						<p>Done</p>
						<span>{tasksCompleted.length} of {tasks.length}</span>
					</div>
				</div>
			</div>

			<div className={styles.task}>

			{tasks.map(task => {
				const taskSelected = task.id === onSelectTask
				return (
					<div key={task.id} className={styles.inputTask}>
					<input  onClick={() => handleCompleteTheTask(task.id)} type="checkbox" checked={taskSelected} onChange={handleCheckBox}  />
					<span className={taskSelected ? styles.completed : ''}>
						{task.content}
					</span>
						<Trash onClick={() => handleDeleteTask(task)} />
				</div>
				)
			})}
				
			</div>
		</div>
	);
};

export default Tasks;
