import './App.css';
import TaskList from './components/TaskList';
import { CategoryProvider } from './components/CategoryContext';
import { TaskProvider } from './components/TaskContext';

function App() {
  return (
    <div className="base-container">
      <CategoryProvider>
        <TaskProvider>
          <div>
            <TaskList />
          </div>
        </TaskProvider>
      </CategoryProvider>
    </div>
    
  );
}

export default App;
