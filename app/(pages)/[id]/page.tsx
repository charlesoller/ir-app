"use client"

import { useParams } from "next/navigation";
import TodoGrid from "../../_components/TodoGrid/TodoGrid";
import { useGlobalStore } from "../../_utils/GlobalStore";
import AppStore from "../../_stores/AppStore";
import { useMemo } from "react";

export default function IdPage() {
  const { tasks } = useGlobalStore(AppStore)
  const { id } = useParams<{ id: string }>()
  const filteredTasks = useMemo(() => tasks.filter(task => task.projectId === id), [tasks, id])
  return (
    <TodoGrid 
      tasks={filteredTasks}
    />
  );
}
