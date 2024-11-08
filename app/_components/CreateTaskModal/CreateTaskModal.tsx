import { Button, Flex, Modal, Select, TextInput, Textarea } from "@mantine/core";
import { useLocalStore } from "../../_utils/LocalStore";
import _ from 'lodash';
import AppStore from "../../_stores/AppStore";
import { Task } from "../../_models/Task";
import { useGlobalStore } from "../../_utils/GlobalStore";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
  activeTask?: Task
}

export default function CreateTaskModal({
  open,
  onClose,
  activeTask,
}: CreateModalProps) {
  const { projects } = useGlobalStore(AppStore);
  const { id } = useParams<{ id: string }>()

  const getProjectId = useCallback(() => {
    if (activeTask?.projectId) return activeTask.projectId;
    if (id) return id;
    if (projects[0]?._id) return projects[0]._id;
    return null;
  }, [activeTask?.projectId, id, projects])

  const [{ title, message, projectId }, $data] = useLocalStore({
    title: activeTask ? activeTask?.title : '',
    message: activeTask ? activeTask.message : '',
    projectId: getProjectId()
  });

  useEffect(() => {
    $data.projectId = id;
  }, [id, $data])

  const formattedProjects = useMemo(() => projects.map(project => (
    { label: project.name, value: project._id }
  )), [projects])

  const isSubmitDisabled = () => (
    _.isEmpty(_.trim(title))
    || _.isEmpty(_.trim(message))
    || !projectId
  )

  const handleSubmit = () => {
    if (!projectId) return;

    if (!!activeTask) {
      AppStore.updateTask(activeTask._id, {
        title, message, projectId
      });
    } else {
      AppStore.createTask({
        title, message, projectId
      })
    }

    $data.title = '';
    $data.message = '';
    onClose();
  }

  return (
    <Modal opened={open} onClose={onClose} title="Create a Task">
      <Flex direction={'column'} gap={16}>
        <TextInput
          value={title}
          onChange={(e) => $data.title = e.target.value}
          label="Title"
          description="Enter the title for your To-Do"
          placeholder="Example Title"
        />
        <Textarea
          value={message}
          onChange={(e) => $data.message = e.target.value}
          label="Description"
          description="What do you need to do?"
          placeholder="Example Description"
        />
        <Select
          label="Project"
          placeholder="Pick value"
          value={projectId}
          data={formattedProjects}
          onChange={(value) => {
            if (value) {
              $data.projectId = value
            }
          }}
        />
        <Button disabled={isSubmitDisabled()} onClick={handleSubmit}>
          {!!activeTask ? 'Update' : 'Create'}
        </Button>
      </Flex>
    </Modal>
  )
}