import { ActionIcon, ButtonGroup, Card, Checkbox, Flex, Text } from "@mantine/core";
import { Task } from "../../_models/Task";
import AppStore from "../../_stores/AppStore";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import CreateModal from "../CreateTaskModal/CreateTaskModal";
import { useLocalStore } from "../../_utils/LocalStore";
import { useGlobalStore } from "../../_utils/GlobalStore";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

interface TodoProps {
  task: Task;
}

export default function Todo({
  task
}: TodoProps) {
  const [{ updateModalOpen, deleteModalOpen }, $data] = useLocalStore({
    updateModalOpen: false,
    deleteModalOpen: false,
  });

  const handleToggle = () => {
    AppStore.toggleTaskComplete(task._id)
  }

  return (
    <>
      <CreateModal
        open={updateModalOpen}
        onClose={() => $data.updateModalOpen = false}
        activeTask={task}
      />
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => $data.deleteModalOpen = false}
        id={task._id}
        type="task"
      />
      <Card shadow="sm" withBorder padding="lg">
        <Flex gap={16}>
          <Checkbox
            checked={task.complete}
            onChange={handleToggle}
          />
          <div style={{ width: '100%' }}>
            <Flex justify={'space-between'} align={'center'}>
              <Text fw={500} mb={7} lh={1}>
                {task.title}
              </Text>
              <div>
                <ActionIcon variant="subtle" onClick={() => $data.updateModalOpen = true}>
                  <IconEdit />
                </ActionIcon>
                <ActionIcon variant="subtle" color="red" onClick={() => $data.deleteModalOpen = true}>
                  <IconTrash />
                </ActionIcon>
              </div>
            </Flex>

            <Text fz="sm" c="dimmed">
              {task.message}
            </Text>
          </div>
        </Flex>
      </Card>
    </>
  )
}