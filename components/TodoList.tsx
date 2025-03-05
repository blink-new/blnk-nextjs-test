import { useTodo } from '@/contexts/TodoContext';
import { TodoItem } from '@/components/TodoItem';
import { Card } from '@/components/ui/card';
import { CheckCircle2, ListTodo, AlertCircle } from 'lucide-react';

export function TodoList() {
  const { filteredTodos, todos } = useTodo();

  if (todos.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center">
        <ListTodo size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No tasks yet</h3>
        <p className="text-muted-foreground">
          Add a new task to get started
        </p>
      </Card>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No matching tasks</h3>
        <p className="text-muted-foreground">
          Try changing your filter
        </p>
      </Card>
    );
  }

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="space-y-1">
      {allCompleted && (
        <div className="flex items-center justify-center gap-2 py-3 text-green-600 bg-green-50 dark:bg-green-950/30 rounded-lg mb-4">
          <CheckCircle2 size={18} />
          <span>All tasks completed!</span>
        </div>
      )}
      
      <Card className="overflow-hidden">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Card>
    </div>
  );
}