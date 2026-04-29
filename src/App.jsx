import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo } from './features/todo/todoSlice';

const App = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();
  
  const { todos } = useSelector((state) => state.todos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    
    dispatch(addTodo({
      id: Date.now(),
      text: todoText
    }));
    setTodoText('');
  };

  const progress = todos.length > 0 ? 100 : 0; 
  return (
    <div style={styles.layout}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>Focus</h1>
          <p style={styles.subtitle}>{todos.length} tasks remaining</p>
          <div style={styles.progressBarContainer}>
            <div style={{ ...styles.progressBar, width: `${todos.length > 0 ? 30 : 0}%` }}></div>
          </div>
        </header>

        <form onSubmit={handleSubmit} style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Add a new mission..."
            style={styles.input}
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button type="submit" style={styles.addButton}>
            +
          </button>
        </form>

        <div style={styles.list}>
          {todos.length > 0 ? (
            todos.map((item, index) => (
              <div key={item.id} style={styles.todoItem}>
                <div style={styles.itemLeft}>
                  <div style={styles.dot}></div>
                  <span style={styles.todoText}>{item.text}</span>
                </div>
                <button
                  onClick={() => dispatch(removeTodo({ id: item.id }))}
                  style={styles.deleteBtn}
                  title="Remove Task"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              <span style={{ fontSize: '40px' }}>🎯</span>
              <p>Your slate is clean.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    backgroundColor: '#0f172a', 
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '80px',
    fontFamily: "'Inter', sans-serif",
    color: '#f8fafc',
  },
  card: {
    backgroundColor: '#1e293b', 
    width: '100%',
    maxWidth: '450px',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '14px',
    marginTop: '4px',
  },
  progressBarContainer: {
    height: '6px',
    backgroundColor: '#334155',
    borderRadius: '10px',
    marginTop: '16px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#38bdf8', 
    transition: 'width 0.4s ease',
  },
  inputGroup: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  input: {
    flex: 1,
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    transition: 'border 0.2s',
  },
  addButton: {
    backgroundColor: '#38bdf8',
    color: '#0f172a',
    border: 'none',
    borderRadius: '12px',
    width: '48px',
    height: '48px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#334155',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid transparent',
    transition: 'all 0.2s ease',
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  dot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#38bdf8',
    borderRadius: '50%',
  },
  todoText: {
    fontSize: '15px',
    fontWeight: '500',
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px',
    transition: 'color 0.2s',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 0',
    color: '#64748b',
  }
};

export default App;