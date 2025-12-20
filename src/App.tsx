import { Header } from './components/Header/Header';
import { TabRouter } from './tabs/TabRouter';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <BrowserRouter basename="/construction-budget-planner">
        <Header />
        <TabRouter />
      </BrowserRouter>
    </>
  )
}

export default App
