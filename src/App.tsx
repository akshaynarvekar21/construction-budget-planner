import { HashRouter } from 'react-router-dom';
import { Header } from './components';
import { TabRouter } from './tabs';

export const App = () => {
  return (
    <>
      <HashRouter basename="/">
        <Header />
        <TabRouter />
      </HashRouter>
    </>
  )
}

export default App
