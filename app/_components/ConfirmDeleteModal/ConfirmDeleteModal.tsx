import { Button, Flex, Modal } from "@mantine/core";
import AppStore from "../../_stores/AppStore";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  type: Entity;
}

type Entity = 'task' | 'project'

export default function ConfirmDeleteModal({
  open,
  onClose,
  id,
  type
}: ConfirmDeleteModalProps){
   const handleDelete = () => {
    if (type === 'task') {
      AppStore.deleteTask(id)
    } else {
      return
    }
   }

  return (
    <Modal opened={open} onClose={onClose} title={`Are you sure you want to delete this ${type}?`}>
      <Flex justify={'space-between'}>
        <Button variant="subtle" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Flex>
    </Modal>
  )
}