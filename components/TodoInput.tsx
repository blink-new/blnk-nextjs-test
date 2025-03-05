import { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function TodoInput() {
  const { addTodo } = useTodo();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
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
      >
        <PlusCircle size={18} className="mr-2" />
        Add
      </Button>
    </form>
  );
}