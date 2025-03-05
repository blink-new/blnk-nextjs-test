import { useTodo } from '@/contexts/TodoContext';
import { TodoItem } from '@/components/TodoItem';
import { Card } from '@/components/ui/card';
import { CheckCircle2, ListTodo, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';

export function TodoList() {
  const { filteredTodos, todos, filter } = useTodo();

  if (todos.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center animate-fade-in border-dashed">
        <ListTodo size={48} className="text-primary/70 mb-4" />
        <h3 className="text-xl font-medium mb-2">Get Started with TaskMaster</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Stay organized by adding your first task. Click the button below to create a new task.
        </p>
        <Button 
          onClick={() => document.getElementById('add-task-trigger')?.click()}
          className="gap-2 transition-all duration-300"
        >
          <PlusCircle size={18} />
          Add Your First Task
        </Button>
      </Card>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center animate-fade-in border-dashed">
        <AlertCircle size={48} className="text-muted-foreground mb-4 opacity-70" />
        <h3 className="text-xl font-medium mb-2">No {filter} tasks found</h3>
        <p className="text-muted-foreground mb-4">
          {filter === 'active' 
            ? "You've completed all your tasks! Add more or switch filters."
            : filter === 'completed'
              ? "You haven't completed any tasks yet. Keep going!"
              : "Try changing your filter or add new tasks."}
        </p>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => document.getElementById('filter-all-button')?.click()}
            className="transition-all duration-300"
          >
            Show All Tasks
          </Button>
          <Button 
            onClick={() => document.getElementById('add-task-trigger')?.click()}
            className="gap-2 transition-all duration-300"
          >
            <PlusCircle size={18} />
            Add New Task
          </Button>
        </div>
      </Card>
    );
  }

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="space-y-4 animate-slide-in">
      {allCompleted && (
        <div className="flex items-center justify-center gap-2 py-3 text-success-foreground bg-success/20 border border-success/30 rounded-lg">
          <CheckCircle2 size={18} />
          <span>All tasks completed!</span>
        </div>
      )}
      
      <Card className="overflow-hidden border border-border shadow-sm">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Card>
    </div>
  );
}