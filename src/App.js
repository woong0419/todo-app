
import MyStatus from './components/Status/MyStatus';
import styles from './App.module.css'
import TodoList from './components/Todo/TodoList';

function App() {
  return (
    <div>
      <h1 className={styles.title}>PokéMon Todo-List</h1>
      <MyStatus />
      <TodoList />
    </div>
  );
}

export default App;
