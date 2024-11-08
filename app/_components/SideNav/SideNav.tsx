import { AppShell, Button, Flex } from "@mantine/core"
import ProjectTab from "../ProjectTab/ProjectTab"
import { useGlobalStore } from "../../_utils/GlobalStore";
import AppStore from "../../_stores/AppStore";
import { useLocalStore } from "../../_utils/LocalStore";
import CreateProjectModal from "../CreateProjectModal/CreateProjectModal";

export default function SideNav() {
  const { projects } = useGlobalStore(AppStore);
  const [{ createModalOpen }, $data] = useLocalStore({
    createModalOpen: false
  });

  return (
    <>
      <CreateProjectModal 
        open={createModalOpen}
        onClose={() => $data.createModalOpen = false}
      />
      <AppShell.Navbar p="md">
        <Flex direction={'column'}>
          <Button mb={16} onClick={() => $data.createModalOpen = true}>+ Create Project</Button>
          {projects.map(project => (
            <ProjectTab key={project._id} project={project} />
          ))}
        </Flex>
      </AppShell.Navbar>
    </>
  )
}