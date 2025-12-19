import { Header } from './components/Header/Header';
import { TabRenderer } from './tabs/TabRenderer';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <BrowserRouter basename="/construction-budget-planner">
        <Header />
        <TabRenderer />
      </BrowserRouter>
    </>
  )
}

export default App
