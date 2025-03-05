import { useState, useRef, useEffect } from 'react';
import { Todo, SubTask, useTodo } from '@/contexts/TodoContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
  Plus,
  AlignLeft,
  Save,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SubtaskItem } from '@/components/SubtaskItem';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, editTodo, addSubtask } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset edit state when todo changes
  useEffect(() => {
    setEditText(todo.text);
    setEditDescription(todo.description);
  }, [todo]);

  // Focus the input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    // Expand when editing to show description field
    setIsExpanded(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText, editDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      addSubtask(todo.id, newSubtask);
      setNewSubtask('');
    }
  };

  const completedSubtasks = todo.subtasks.filter(subtask => subtask.completed).length;
  const totalSubtasks = todo.subtasks.length;
  const hasSubtasks = totalSubtasks > 0;
  const hasDescription = todo.description.trim().length > 0;

  return (
    <div 
      className={cn(
        "group border-b border-border last:border-0",
        "transition-all duration-300",
        todo.completed && "bg-muted/30"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 flex-1">
          {!isEditing && (
            <Checkbox 
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
              className="transition-all duration-300"
            />
          )}
          
          {isEditing ? (
            <div className="flex-1">
              <Input
                ref={inputRef}
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50"
                placeholder="Task title"
                autoFocus
              />
            </div>
          ) : (
            <div className="flex-1">
              <span 
                className={cn(
                  "block transition-all duration-300 font-medium",
                  todo.completed && "line-through text-muted-foreground"
                )}
              >
                {todo.text}
              </span>
              
              {/* Always show description as subtitle if it exists */}
              {hasDescription && (
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                  {todo.description}
                </p>
              )}
              
              {/* Show subtask count if there are subtasks */}
              {hasSubtasks && (
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    {completedSubtasks}/{totalSubtasks} subtasks
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {isEditing ? (
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSave}
                className="h-8 w-8 text-muted-foreground hover:text-success"
              >
                <Save size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleCancel}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <>
              {(hasDescription || hasSubtasks) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
              )}
              
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleEdit}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Edit2 size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => deleteTodo(todo.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <Collapsible open={isExpanded || isEditing} onOpenChange={setIsExpanded}>
        <CollapsibleContent className="px-4 pb-4 pt-0 space-y-3">
          {isEditing ? (
            <div className="pl-7 space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a description (optional)"
                className="min-h-[80px] text-sm resize-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            </div>
          ) : hasDescription && (
            <div className="pl-7 text-sm text-muted-foreground">
              <p className="whitespace-pre-wrap">{todo.description}</p>
            </div>
          )}
          
          {/* Subtasks section */}
          <div className="pl-7 space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground mb-1">
              {hasSubtasks ? 'Subtasks' : 'Add Subtasks'}
            </h4>
            {hasSubtasks && (
              <div className="space-y-1">
                {todo.subtasks.map(subtask => (
                  <SubtaskItem 
                    key={subtask.id} 
                    subtask={subtask} 
                    todoId={todo.id} 
                  />
                ))}
              </div>
            )}
            
            <form onSubmit={handleAddSubtask} className="flex gap-2 mt-2">
              <Input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="Add a subtask..."
                className="flex-1 h-8 text-sm transition-all duration-300"
              />
              <Button 
                type="submit" 
                size="sm" 
                variant="ghost"
                className="h-8 px-2 text-xs"
                disabled={!newSubtask.trim()}
              >
                <Plus size={14} className="mr-1" />
                Add
              </Button>
            </form>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}