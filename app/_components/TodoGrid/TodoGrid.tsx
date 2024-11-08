"use client"

import { AppShell, Grid } from "@mantine/core";
import Todo from "../Todo/Todo";
import { Task } from "../../_models/Task";
import { useMediaQuery } from "@mantine/hooks";

interface TodoGridProps {
  tasks: readonly Task[];
}

export default function TodoGrid({ tasks }: TodoGridProps) {
  const mobile = useMediaQuery('(max-width: 600px)');

  return (
    <AppShell.Main>
      <Grid>
        {tasks.map(task => (
          <Grid.Col key={task._id} span={mobile ? 12 : 6}>
            <Todo task={task} />
          </Grid.Col>
        ))}
      </Grid>
    </AppShell.Main>
  )
}