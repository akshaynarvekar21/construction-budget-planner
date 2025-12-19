import { Tab, Tabs } from '@mui/material';
import { useTab, TabType } from '../../context/TabContext';

export const AppTabs = () => {
    const { tab, setTab } = useTab();

    const handleChange = (event: React.SyntheticEvent, tab: TabType) => {
        setTab(tab);
    };

    return (
        <Tabs
            value={tab}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
        >
            <Tab value={TabType.BUDGET} label="Budget" />
            <Tab value={TabType.COST} label="Cost Codes" />
        </Tabs>
    );
}