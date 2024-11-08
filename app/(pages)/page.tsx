"use client"

import TodoGrid from "../_components/TodoGrid/TodoGrid";
import AppStore from "../_stores/AppStore";
import { useGlobalStore } from "../_utils/GlobalStore";

export default function HomePage() {
  const { tasks } = useGlobalStore(AppStore)

  return (
    <TodoGrid tasks={tasks} />
  );
}
