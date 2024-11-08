import _ from 'lodash';

import { Button, Flex, Modal, TextInput } from "@mantine/core";
import { Project } from "../../_models/Project";
import { useLocalStore } from "../../_utils/LocalStore";
import AppStore from '../../_stores/AppStore';
import { useRouter } from 'next/navigation';

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  activeProject?: Project;
}

export default function CreateProjectModal({
  open,
  onClose,
  activeProject
}: CreateProjectModalProps) {
  const router = useRouter();
  const [{ name }, $data] = useLocalStore({
    name: activeProject ? activeProject?.name : '',
  });

  const isSubmitDisabled = () => _.isEmpty(_.trim(name));

  const handleSubmit = async () => {
    if (!!activeProject) {
      AppStore.updateProject(activeProject._id, { name });
    } else {
      const id = await AppStore.createProject({ name });
      router.push(`/${id}`);
    }

    $data.name = '';
    onClose();
  }

  const handleDelete = () => {
    if (!activeProject) return;
    AppStore.deleteProject(activeProject._id);
    onClose();
  }

  return (
    <Modal opened={open} onClose={onClose} title={!!activeProject ? 'Update Your Project' : 'Create a Project'}>
      <Flex direction={'column'} gap={16}>
        <TextInput
          value={name}
          onChange={(e) => $data.name = e.target.value}
          label="Name"
          description="What's the name of your project?"
          placeholder="Example Name"
        />
        <Flex justify={'space-between'}>
          { !!activeProject ? (
            <Button variant='subtle' color='red' onClick={handleDelete}>
              Delete
            </Button>
          ) : null}
          <Button disabled={isSubmitDisabled()} onClick={handleSubmit} ml={'auto'}>
            {!!activeProject ? 'Update' : 'Create'}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}