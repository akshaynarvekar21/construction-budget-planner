import { AppBar, Box, Container, Divider, Switch, Toolbar, Typography } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AppTabs } from '../Tabs';

export const Header = () => {
  const { mode, systemMode, setMode } = useColorScheme();
  const isDarkMode = (mode === 'system' ? systemMode : mode) === 'dark';

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 600 }} variant="h4">
            1234 Main Street
          </Typography>
          <Box display='flex' alignItems='center'>
            <LightModeIcon fontSize="small" />
            <Switch
              checked={isDarkMode}
              onChange={(event) => setMode(event.target.checked ? 'dark' : 'light')}
              slotProps={{ input: { 'aria-label': 'Toggle dark mode' } }}
            />
            <DarkModeIcon fontSize="small" />
          </Box>
        </Toolbar>
        <AppTabs />
      </Container>
      <Divider />
    </AppBar>
  );
}
