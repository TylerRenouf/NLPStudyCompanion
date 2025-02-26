import './App.css';
import '@mantine/core/styles.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider, AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


import Cards from './pages/Cards/Cards';
import Decks from './pages/Decks/Decks';
import { NavbarContentProvider } from './utils/NavbarContentContext';
import NavbarContent from './Components/NavbarContent';


function App() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <MantineProvider>
            <NavbarContentProvider>
                <AppShell
                    header={{ height: 70 }}
                    navbar={{
                        width: { base: 200, md: 250, lg: 300 },
                        breakpoint: 'sm',
                        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                    }}
                    padding="md"
                >
 
                    <AppShell.Header>
                        <Group h="100%" px="md">
                            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                        </Group>
                    </AppShell.Header>

                    <AppShell.Navbar>
                        <NavbarContent />
                    </AppShell.Navbar>

                    <AppShell.Main>
                        <Router>
                            <Routes>
                                <Route path="/" element={<Decks />} />
                                <Route path="/deck/:deckId" element={<Cards />} />
                            </Routes>
                        </Router>
                    </AppShell.Main>


                </AppShell>
            </NavbarContentProvider>
        </MantineProvider>
    );
}

export default App;