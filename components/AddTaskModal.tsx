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
import { PlusCircle } from 'lucide-react';

export function AddTaskModal() {
  const { addTodo } = useTodo();
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, description);
      setText('');
      setDescription('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 transition-all duration-300">
          <PlusCircle size={18} />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
            <div className="space-y-2">
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