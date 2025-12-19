import { Tab, Tabs } from '@mui/material';
import { Link, useLocation } from "react-router-dom";

enum TabType {
    BUDGET = 'budget',
    COST = 'cost'
}

export const AppTabs = () => {
    const location = useLocation();
    const currentTab =
        location.pathname.includes('/budget') ?
            TabType.BUDGET :
            TabType.COST;

    return (
        <Tabs
            value={currentTab}
        >
            <Tab
                component={Link}
                label="Budget"
                value={TabType.BUDGET}
                to='/budget'
            />
            <Tab
                component={Link}
                label="Cost Codes"
                value={TabType.COST}
                to='/cost'
            />
        </Tabs>
    );
}