import { Header } from './components/Header/Header';
import { TabRenderer } from './tabs/TabRenderer';
import { TabProvider } from './context/TabContext';
import './App.css';

export const App = () => {
  return (
    <>
      <TabProvider>
        <Header />
        <TabRenderer />
      </TabProvider>
    </>
  )
}

export default App
