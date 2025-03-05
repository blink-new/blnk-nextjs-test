import { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { PlusCircle, Plus, Trash2, AlignLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubtaskInput {
  id: string;
  text: string;
}

export function AddTaskModal() {
  const { addTodoWithSubtasks } = useTodo();
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState<SubtaskInput[]>([]);
  const [open, setOpen] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { id: crypto.randomUUID(), text: '' }]);
  };

  const handleSubtaskChange = (id: string, value: string) => {
    setSubtasks(subtasks.map(st => st.id === id ? { ...st, text: value } : st));
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      // Filter out empty subtasks
      const validSubtasks = subtasks.filter(st => st.text.trim() !== '');
      addTodoWithSubtasks(text, description, validSubtasks);
      resetForm();
      setOpen(false);
    }
  };

  const resetForm = () => {
    setText('');
    setDescription('');
    setSubtasks([]);
    setShowDescription(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button id="add-task-trigger" className="gap-2 transition-all duration-300">
          <PlusCircle size={18} />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="task-title" className="text-sm font-medium">
                Task Title
              </label>
              <Input
                id="task-title"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                className="transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 border-border"
                autoFocus
              />
            </div>
            
            {showDescription ? (
              <div className="space-y-2 animate-fade-in">
                <label htmlFor="task-description" className="text-sm font-medium">
                  Description (optional)
                </label>
                <Textarea
                  id="task-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add more details about this task..."
                  className="min-h-[100px] resize-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 border-border"
                />
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowDescription(true)}
                className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
              >
                <AlignLeft size={16} />
                Add Description
              </Button>
            )}
            
            {/* Subtasks section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Subtasks</label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddSubtask}
                  className="h-8 px-2 text-xs"
                >
                  <Plus size={14} className="mr-1" />
                  Add Subtask
                </Button>
              </div>
              
              {subtasks.length > 0 ? (
                <div className="space-y-2 animate-fade-in">
                  {subtasks.map((subtask, index) => (
                    <div key={subtask.id} className="flex items-center gap-2">
                      <Input
                        value={subtask.text}
                        onChange={(e) => handleSubtaskChange(subtask.id, e.target.value)}
                        placeholder={`Subtask ${index + 1}`}
                        className="flex-1 h-9 text-sm transition-all duration-300"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSubtask(subtask.id)}
                        className="h-9 w-9 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Break down your task into smaller steps (optional)
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="transition-all duration-300"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!text.trim()}
              className="transition-all duration-300"
            >
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}