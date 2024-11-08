"use client"

import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript, AppShell } from "@mantine/core";
import { theme } from "../../theme";
import Header from "../_components/Header/Header";
import SideNav from "../_components/SideNav/SideNav";
import { useLocalStore } from "../_utils/LocalStore";
import { useDidMount } from "rooks";
import { useGlobalStore } from "../_utils/GlobalStore";
import AppStore from "../_stores/AppStore";

export default function RootLayout({ children }: { children: any }) {
  const { tasks, loadTasks, projects, loadProjects } = useGlobalStore(AppStore);

  useDidMount(() => {
    if (!tasks || !tasks?.length) loadTasks();
    if (!projects || !projects?.length) loadProjects();
  });
  
  const [{burgerOpen}, $data] = useLocalStore({
		burgerOpen: false
	});

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShell
            header={{ height: 68 }}
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !burgerOpen },
            }}
            padding="md"
          >
            <Header burgerOpen={burgerOpen} toggle={() => $data.burgerOpen = !burgerOpen} />
            <SideNav />
            { children }
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
