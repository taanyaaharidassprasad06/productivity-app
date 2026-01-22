import './App.css';
import TaskList from './components/TaskList';
import { CategoryProvider } from './components/CategoryContext';

function App() {
  return (
    <CategoryProvider>
      <div>
        <TaskList />
      </div>
    </CategoryProvider>
  );
}

export default App;
