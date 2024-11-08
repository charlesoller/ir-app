"use client"

import { ActionIcon, NavLink } from "@mantine/core";
import { Project } from "../../_models/Project";
import { useParams } from "next/navigation";
import { IconSettings } from "@tabler/icons-react";
import CreateProjectModal from "../CreateProjectModal/CreateProjectModal";
import { useLocalStore } from "../../_utils/LocalStore";

interface ProjectTabProps {
  project: Project;
}

export default function ProjectTab({
  project
}: ProjectTabProps) {
  const { id } = useParams<{ id: string }>()
  const [{ createModalOpen }, $data] = useLocalStore({
    createModalOpen: false
  });

  const handleOpenModal = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    $data.createModalOpen = true;
  }

  return (
    <>
      <CreateProjectModal 
        open={createModalOpen}
        onClose={() => $data.createModalOpen = false}
        activeProject={project}
      />
      <NavLink
        href={`/${project._id}`}
        label={project.name}
        active={id === project._id}
        rightSection={
          <ActionIcon variant="subtle" color="rgba(199, 199, 199, 1)" onClick={handleOpenModal}>
            <IconSettings />
          </ActionIcon>
        }
      />
    </>
  )
}