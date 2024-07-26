import { useEffect, useState, useTransition } from 'react';
import { createPortal } from 'react-dom';
import { create } from 'zustand';

type TaskId = string;

interface LoaderStore {
  loadingTasks: string[];
  addTask: (taskId: string) => void;
  removeTask: (taskId: TaskId) => void;
  clearAllTask: () => void;
}

const useLoaderStore = create<LoaderStore>((set) => ({
  loadingTasks: [],
  addTask: (taskId: string) =>
    set((state) => ({
      loadingTasks: [...state.loadingTasks, taskId],
    })),
  removeTask: (taskId: string) =>
    set((state) => ({
      loadingTasks: state.loadingTasks.filter(
        (loadingTaskId) => loadingTaskId !== taskId
      ),
    })),
  clearAllTask: () =>
    set(() => ({
      loadingTasks: [],
    })),
}));

const useIsLoading = (loadingTasks: string[]) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (loadingTasks.length > 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingTasks]);

  return isLoading;
};

export const useLoader = () => {
  const { loadingTasks, loderAction } = useLoaderStore(
    ({ loadingTasks, ...loderAction }) => ({
      loadingTasks,
      loderAction,
    })
  );

  const isLoading = useIsLoading(loadingTasks);
  return {
    isLoading,
    createLoader: (key?: string) => {
      const taskId = `${key ? key + ':' : ''}${new Date().toISOString}`;
      loderAction.addTask(taskId);
      return {
        complete: () => loderAction.removeTask(taskId),
      };
    },
    resetAll: () => loderAction.clearAllTask(),
  };
};
