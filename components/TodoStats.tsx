import { useTodo } from '@/contexts/TodoContext';
import { Progress } from '@/components/ui/progress';

export function TodoStats() {
  const { todos } = useTodo();
  
  if (todos.length === 0) return null;
  
  const completed = todos.filter(todo => todo.completed).length;
  const total = todos.length;
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2 text-sm">
        <span>Progress</span>
        <span>{completed} of {total} tasks completed ({percentage}%)</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}