import { useState, useRef, useEffect } from 'react';
import { SubTask, useTodo } from '@/contexts/TodoContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface SubtaskItemProps {
  subtask: SubTask;
  todoId: string;
}

export function SubtaskItem({ subtask, todoId }: SubtaskItemProps) {
  const { toggleSubtask, deleteSubtask, editSubtask } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(subtask.text);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset edit state when subtask changes
  useEffect(() => {
    setEditText(subtask.text);
  }, [subtask]);

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

  const handleCancel = () => {
    setEditText(subtask.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
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
        {!isEditing && (
          <Checkbox 
            checked={subtask.completed}
            onCheckedChange={() => toggleSubtask(todoId, subtask.id)}
            className="h-3.5 w-3.5 transition-all duration-300"
          />
        )}
        
        {isEditing ? (
          <Input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 h-7 text-sm bg-transparent transition-all duration-300"
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
      
      {isEditing ? (
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSave}
            className="h-6 w-6 text-muted-foreground hover:text-success"
          >
            <Save size={12} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleCancel}
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
          >
            <X size={12} />
          </Button>
        </div>
      ) : (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleEdit}
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            <Edit2 size={12} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => deleteSubtask(todoId, subtask.id)}
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
          >
            <Trash2 size={12} />
          </Button>
        </div>
      )}
    </div>
  );
}