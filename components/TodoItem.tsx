import { useState, useRef, useEffect } from 'react';
import { Todo, useTodo } from '@/contexts/TodoContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, editTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div 
      className={cn(
        "group flex items-center justify-between p-4 border-b border-border last:border-0",
        "transition-all duration-300 hover:bg-secondary/40",
        todo.completed && "opacity-70"
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        <Checkbox 
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
          className="transition-all duration-300 data-[state=checked]:bg-success data-[state=checked]:border-success"
        />
        
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-b-2 border-primary/30 focus:border-primary outline-none px-1 py-0.5"
            autoFocus
          />
        ) : (
          <span 
            className={cn(
              "flex-1 transition-all duration-300",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {!isEditing && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleEdit}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Edit2 size={16} />
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => deleteTodo(todo.id)}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}