import { TodoProvider } from '@/contexts/TodoContext';
import { AddTaskModal } from '@/components/AddTaskModal';
import { TodoFilter } from '@/components/TodoFilter';
import { TodoList } from '@/components/TodoList';
import { TodoStats } from '@/components/TodoStats';
import { ThemeToggle } from '@/components/ThemeToggle';
import localFont from "next/font/local";
import { CheckSquare } from 'lucide-react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="container max-w-2xl mx-auto p-6 py-12">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <CheckSquare size={24} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Todo App</h1>
          <p className="text-muted-foreground">Stay organized and productive</p>
        </header>
        
        <TodoProvider>
          <div className="flex justify-end mb-6">
            <AddTaskModal />
          </div>
          <TodoStats />
          <TodoFilter />
          <TodoList />
        </TodoProvider>
      </div>
    </div>
  );
}