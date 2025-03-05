import { useTodo } from '@/contexts/TodoContext';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, ListChecks } from 'lucide-react';

export function TodoStats() {
  const { todos } = useTodo();
  
  if (todos.length === 0) return null;
  
  const completed = todos.filter(todo => todo.completed).length;
  const active = todos.length - completed;
  const total = todos.length;
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div className="mb-6 bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between mb-3 text-sm">
        <span className="font-medium flex items-center gap-1.5">
          <ListChecks size={16} className="text-primary" />
          Task Progress
        </span>
        <span className={cn(
          percentage === 100 ? "text-success font-medium" : "text-muted-foreground"
        )}>
          {completed} of {total} tasks completed ({percentage}%)
        </span>
      </div>
      
      <Progress 
        value={percentage} 
        className="h-2 mb-4" 
        indicatorClassName={percentage === 100 ? "bg-success" : ""}
      />
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground">Active</p>
            <p className="font-medium">{active} tasks</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 size={16} className="text-success" />
          </div>
          <div>
            <p className="text-muted-foreground">Completed</p>
            <p className="font-medium">{completed} tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
}