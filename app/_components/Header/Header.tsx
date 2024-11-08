import { AppShell, Burger, Button, Flex, Text } from "@mantine/core";
import { useLocalStore } from "../../_utils/LocalStore";
import CreateModal from "../CreateTaskModal/CreateTaskModal";
import { useGlobalStore } from "../../_utils/GlobalStore";
import AppStore from "../../_stores/AppStore";
import Link from "next/link";

interface HeaderProps {
  burgerOpen: boolean;
  toggle: () => void;
}

export default function Header({
  burgerOpen,
  toggle
}: HeaderProps) {
  const { projects } = useGlobalStore(AppStore);
  const [{ createModalOpen }, $data] = useLocalStore({
    createModalOpen: false
  });

  return (
    <>
      <CreateModal open={createModalOpen} onClose={() => $data.createModalOpen = !createModalOpen} />
      <AppShell.Header>
        <Flex p={16} align={'center'} justify={'space-between'}>
          <Flex align={'center'} gap={16}>
            <Burger
              opened={burgerOpen}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Link href={"/"} style={{ textDecoration: 'none', color: 'unset' }}>
              <Text fw={500} size="lg">IR Demo</Text>
            </Link>
          </Flex>
          <Button onClick={() => $data.createModalOpen = true} disabled={!projects.length}>
            + Create Task
          </Button>
        </Flex>
      </AppShell.Header>
    </>
  )
}