import './App.css';
import TaskList from './components/TaskList';
import { CategoryProvider } from './components/CategoryContext';
import { TaskProvider } from './components/TaskContext';

function App() {
  return (
    <CategoryProvider>
      <TaskProvider>
        <div>
          <TaskList />
        </div>
      </TaskProvider>
    </CategoryProvider>
  );
}

export default App;
