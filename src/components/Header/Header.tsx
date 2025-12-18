import { AppBar, Toolbar, Typography } from '@mui/material';
import { AppTabs } from '../Tabs/Tabs';

export const Header = () => {

  return (
    <AppBar position='static'>
      <Toolbar sx={{ padding: '16px' }}>
        <Typography variant="h4">
          1234 Main Street
        </Typography>
      </Toolbar>
      <AppTabs />
    </AppBar>
  );
}