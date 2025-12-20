import { BrowserRouter } from 'react-router-dom';
import { Header } from './components';
import { TabRouter } from './tabs';

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
