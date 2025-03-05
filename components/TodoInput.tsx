import { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, AlignLeft, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function TodoInput() {
  const { addTodo } = useTodo();
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, description);
      setText('');
      setDescription('');
      setShowDescription(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2 mb-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 border-border"
        />
        <Button 
          type="submit" 
          className="transition-all duration-300"
          disabled={!text.trim()}
        >
          <PlusCircle size={18} className="mr-2" />
          Add
        </Button>
      </div>
      
      <div className={cn("relative", !showDescription && "hidden")}>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)..."
          className="min-h-[80px] resize-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 border-border"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => {
            setShowDescription(false);
            setDescription('');
          }}
        >
          <X size={14} />
        </Button>
      </div>
      
      {!showDescription && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-1 text-xs text-muted-foreground hover:text-foreground"
          onClick={() => setShowDescription(true)}
        >
          <AlignLeft size={14} className="mr-1" />
          Add description
        </Button>
      )}
    </form>
  );
}