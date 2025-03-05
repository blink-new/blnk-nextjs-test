import { useState, useRef, useEffect } from 'react';
import { SubTask, useTodo } from '@/contexts/TodoContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubtaskItemProps {
  subtask: SubTask;
  todoId: string;
}

export function SubtaskItem({ subtask, todoId }: SubtaskItemProps) {
  const { toggleSubtask, deleteSubtask, editSubtask } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(subtask.text);
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
    if (editText.trim()) {
      editSubtask(todoId, subtask.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(subtask.text);
      setIsEditing(false);
    }
  };

  return (
    <div 
      className={cn(
        "group flex items-center justify-between py-1 px-2 rounded",
        "transition-all duration-300 hover:bg-secondary/40",
        subtask.completed && "opacity-70"
      )}
    >
      <div className="flex items-center gap-2 flex-1">
        <Checkbox 
          checked={subtask.completed}
          onCheckedChange={() => toggleSubtask(todoId, subtask.id)}
          className="h-3.5 w-3.5 transition-all duration-300"
        />
        
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm bg-transparent border-b border-primary/30 focus:border-primary outline-none px-1 py-0.5"
            autoFocus
          />
        ) : (
          <span 
            className={cn(
              "flex-1 text-sm transition-all duration-300",
              subtask.completed && "line-through text-muted-foreground"
            )}
          >
            {subtask.text}
          </span>
        )}
      </div>
      
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {!isEditing && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleEdit}
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            <Edit2 size={12} />
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => deleteSubtask(todoId, subtask.id)}
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
        >
          <Trash2 size={12} />
        </Button>
      </div>
    </div>
  );
}