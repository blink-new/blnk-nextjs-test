import { useTodo } from '@/contexts/TodoContext';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function TodoStats() {
  const { todos } = useTodo();
  
  if (todos.length === 0) return null;
  
  const completed = todos.filter(todo => todo.completed).length;
  const total = todos.length;
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div className="mb-6 bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-medium">Progress</span>
        <span className={cn(
          percentage === 100 ? "text-success" : "text-muted-foreground"
        )}>
          {completed} of {total} tasks completed ({percentage}%)
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2" 
        indicatorClassName={percentage === 100 ? "bg-success" : ""}
      />
    </div>
  );
}