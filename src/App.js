import './App.css';
import TaskList from './components/TaskList';
import { CategoryProvider } from './components/CategoryContext';
import { TaskProvider } from './components/TaskContext';
import { useState } from 'react';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebar, setSidebarOpen] = useState(false);
  return (
    <div className="base-container">
      <CategoryProvider>
        <TaskProvider>
          <div className="main-section">
            <div className="sidebar-settings">
              <button className="sidebar-btn" onClick={() => setSidebarOpen(!sidebar)}>#</button>
              {sidebar && <Sidebar/>}
            </div>
            <TaskList />
          </div>
        </TaskProvider>
      </CategoryProvider>
    </div>
    
  );
}

export default App;
