import { Category } from './Category';
import { Day } from './Day';
import { Frequency } from './Frequency';
import { Note } from './Note';

export interface Todo {
  categories: Category[] | null;
  description: string;
  expiration: string | null;
  id: number;
  frequency: Frequency | null;
  days: Day[] | null;
  status: string | null;
  note: Note | null;
}

export interface CreateTodo {
  categories: Category[] | null;
  description: string;
  expiration: string | null;
  frequency: Frequency | null;
  days: Day[] | null;
  status: string | null;
  note: Note | null;
}
