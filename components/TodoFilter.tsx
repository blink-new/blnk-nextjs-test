import { useTodo } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ListFilter } from 'lucide-react';

export function TodoFilter() {
  const { filter, setFilter, todos } = useTodo();
  
  // If there are no todos, don't show the filter
  if (todos.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center text-muted-foreground mr-1">
        <ListFilter size={16} className="mr-1" />
        <span className="text-sm">Filter:</span>
      </div>
      <div className="flex gap-1 border rounded-md p-0.5 bg-background">
        <Button
          id="filter-all-button"
          variant="ghost"
          size="sm"
          onClick={() => setFilter('all')}
          className={cn(
            "h-7 px-3 rounded-sm transition-all duration-300",
            filter === 'all' && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          All
        </Button>
        <Button
          id="filter-active-button"
          variant="ghost"
          size="sm"
          onClick={() => setFilter('active')}
          className={cn(
            "h-7 px-3 rounded-sm transition-all duration-300",
            filter === 'active' && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          Active
        </Button>
        <Button
          id="filter-completed-button"
          variant="ghost"
          size="sm"
          onClick={() => setFilter('completed')}
          className={cn(
            "h-7 px-3 rounded-sm transition-all duration-300",
            filter === 'completed' && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}