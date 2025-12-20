import { AppBar, Container, Divider, Toolbar, Typography } from '@mui/material';
import { AppTabs } from '../Tabs';

export const Header = () => {

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar disableGutters>
          <Typography sx={{ fontWeight: 600 }} variant="h4">
            1234 Main Street
          </Typography>
        </Toolbar>
        <AppTabs />
      </Container>
      <Divider />
    </AppBar>
  );
}