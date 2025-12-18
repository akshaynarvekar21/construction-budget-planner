import { Box, Tab, Tabs } from '@mui/material';
import { useTab, TabType } from '../../context/TabContext';

export const AppTabs = () => {
    const { tab, setTab } = useTab();

    const handleChange = (event: React.SyntheticEvent, tab: TabType) => {
        setTab(tab);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                value={tab}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                sx={{ paddingLeft: '16px' }}
            >
                <Tab value={TabType.BUDGET} label="Budget" />
                <Tab value={TabType.COST} label="Cost Codes" />
            </Tabs>
        </Box>
    );
}