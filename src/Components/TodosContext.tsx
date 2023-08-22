import React, { useMemo, useState } from 'react';
import { ListAction } from '../Enum/ListAction';
import { Todo } from '../types/Todo';

export type TodosContext = {
  todo: Todo[],
  setTodo: (value: Todo[]) => void,
  filter: ListAction,
  setFilter: (value: ListAction) => void,
  filterTodos: () => Todo[],
  isToggleAll: boolean;
  setIsToggleAll: (ListAction: boolean) => void,
};

type Props = {
  children: React.ReactNode;
};

export const TodoContext = React.createContext<TodosContext>({
  todo: [],
  setTodo: () => {},
  filter: ListAction.ALL,
  setFilter: () => {},
  filterTodos: () => [],
  isToggleAll: false,
  setIsToggleAll: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<ListAction>(ListAction.ALL);
  const [isToggleAll, setIsToggleAll] = useState<boolean>(false);

  const filterTodos = () => {
    switch (filter) {
      case ListAction.ACTIVE:
        return todo.filter(todos => !todos.completed);
      case ListAction.COMPLETED:
        return todo.filter(todos => todos.completed);
      case ListAction.ALL:
      default:
        return todo;
    }
  };

  const initTodos = useMemo(() => ({
    todo,
    setTodo,
    filter,
    setFilter,
    filterTodos,
    isToggleAll,
    setIsToggleAll,
  }), [filter, todo]);

  return (
    <TodoContext.Provider value={initTodos}>
      {children}
    </TodoContext.Provider>
  );
};
