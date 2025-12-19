import { Tab, Tabs } from '@mui/material';
import { useTab, TabType } from '../../context/TabContext';

export const AppTabs = () => {
    const { tab, setTab } = useTab();

    const handleChange = (_: React.SyntheticEvent, tab: TabType) => {
        setTab(tab);
    };

    return (
        <Tabs
            value={tab}
            onChange={handleChange}
        >
            <Tab value={TabType.BUDGET} label="Budget" />
            <Tab value={TabType.COST} label="Cost Codes" />
        </Tabs>
    );
}