import { TodoProvider } from '@/contexts/TodoContext';
import { AddTaskModal } from '@/components/AddTaskModal';
import { TodoFilter } from '@/components/TodoFilter';
import { TodoList } from '@/components/TodoList';
import { TodoStats } from '@/components/TodoStats';
import { ThemeToggle } from '@/components/ThemeToggle';
import localFont from "next/font/local";
import { CheckSquare } from 'lucide-react';
import Head from 'next/head';

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
    <>
      <Head>
        <title>TaskMaster | Stay Organized</title>
        <meta name="description" content="A beautiful and functional todo app to help you stay organized and productive" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 font-[family-name:var(--font-geist-sans)]`}
      >
        <div className="container max-w-2xl mx-auto p-4 sm:p-6 py-8 sm:py-12">
          <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center p-2 bg-primary/10 rounded-full">
                <CheckSquare size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">TaskMaster</h1>
                <p className="text-sm text-muted-foreground">Stay organized and productive</p>
              </div>
            </div>
            <ThemeToggle />
          </header>
          
          <TodoProvider>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <TodoFilter />
              <AddTaskModal />
            </div>
            <TodoStats />
            <TodoList />
          </TodoProvider>
        </div>
      </div>
    </>
  );
}