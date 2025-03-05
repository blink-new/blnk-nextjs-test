import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  subtasks: SubTask[];
}

interface SubtaskInput {
  id: string;
  text: string;
}

type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string, description?: string) => void;
  addTodoWithSubtasks: (text: string, description: string, subtasks: SubtaskInput[]) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string, description?: string) => void;
  addSubtask: (todoId: string, text: string) => void;
  toggleSubtask: (todoId: string, subtaskId: string) => void;
  deleteSubtask: (todoId: string, subtaskId: string) => void;
  editSubtask: (todoId: string, subtaskId: string, text: string) => void;
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  filteredTodos: Todo[];
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos);
        // Convert string dates back to Date objects
        const todosWithDates = parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          // Ensure subtasks array exists for backward compatibility
          subtasks: todo.subtasks || []
        }));
        setTodos(todosWithDates);
      } catch (error) {
        console.error('Failed to parse todos from localStorage', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text: string, description: string = '') => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          text: text.trim(),
          description: description.trim(),
          completed: false,
          createdAt: new Date(),
          subtasks: []
        }
      ]);
    }
  };

  // Add a new todo with subtasks
  const addTodoWithSubtasks = (text: string, description: string, subtaskInputs: SubtaskInput[]) => {
    if (text.trim()) {
      const subtasks = subtaskInputs
        .filter(st => st.text.trim())
        .map(st => ({
          id: st.id,
          text: st.text.trim(),
          completed: false
        }));

      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          text: text.trim(),
          description: description.trim(),
          completed: false,
          createdAt: new Date(),
          subtasks
        }
      ]);
    }
  };

  // Toggle a todo's completed status
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id 
          ? { 
              ...todo, 
              completed: !todo.completed,
              // If marking as complete, also complete all subtasks
              subtasks: !todo.completed 
                ? todo.subtasks.map(st => ({ ...st, completed: true }))
                : todo.subtasks
            } 
          : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Edit a todo
  const editTodo = (id: string, text: string, description?: string) => {
    if (text.trim()) {
      setTodos(
        todos.map(todo =>
          todo.id === id 
            ? { 
                ...todo, 
                text: text.trim(),
                description: description !== undefined ? description.trim() : todo.description
              } 
            : todo
        )
      );
    }
  };

  // Add a subtask to a todo
  const addSubtask = (todoId: string, text: string) => {
    if (text.trim()) {
      setTodos(
        todos.map(todo =>
          todo.id === todoId
            ? {
                ...todo,
                subtasks: [
                  ...todo.subtasks,
                  {
                    id: crypto.randomUUID(),
                    text: text.trim(),
                    completed: false
                  }
                ]
              }
            : todo
        )
      );
    }
  };

  // Toggle a subtask's completed status
  const toggleSubtask = (todoId: string, subtaskId: string) => {
    setTodos(
      todos.map(todo => {
        if (todo.id !== todoId) return todo;
        
        // Update the specific subtask
        const updatedSubtasks = todo.subtasks.map(subtask =>
          subtask.id === subtaskId
            ? { ...subtask, completed: !subtask.completed }
            : subtask
        );
        
        // Check if all subtasks are now completed
        const allSubtasksCompleted = updatedSubtasks.length > 0 && 
          updatedSubtasks.every(subtask => subtask.completed);
        
        // If all subtasks are completed, mark the todo as completed
        return {
          ...todo,
          subtasks: updatedSubtasks,
          completed: allSubtasksCompleted
        };
      })
    );
  };

  // Delete a subtask
  const deleteSubtask = (todoId: string, subtaskId: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter(subtask => subtask.id !== subtaskId)
            }
          : todo
      )
    );
  };

  // Edit a subtask
  const editSubtask = (todoId: string, subtaskId: string, text: string) => {
    if (text.trim()) {
      setTodos(
        todos.map(todo =>
          todo.id === todoId
            ? {
                ...todo,
                subtasks: todo.subtasks.map(subtask =>
                  subtask.id === subtaskId
                    ? { ...subtask, text: text.trim() }
                    : subtask
                )
              }
            : todo
        )
      );
    }
  };

  // Filter and sort todos
  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true; // 'all' filter
    })
    .sort((a, b) => {
      // Sort by completion status first (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then sort by creation date (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        addTodoWithSubtasks,
        toggleTodo,
        deleteTodo,
        editTodo,
        addSubtask,
        toggleSubtask,
        deleteSubtask,
        editSubtask,
        filter,
        setFilter,
        filteredTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};