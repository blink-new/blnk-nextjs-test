import { useTodo } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function TodoFilter() {
  const { filter, setFilter } = useTodo();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setFilter('all')}
        className={cn(
          "transition-all duration-300 border-border",
          filter === 'all' && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        All
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setFilter('active')}
        className={cn(
          "transition-all duration-300 border-border",
          filter === 'active' && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        Active
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setFilter('completed')}
        className={cn(
          "transition-all duration-300 border-border",
          filter === 'completed' && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        Completed
      </Button>
    </div>
  );
}