import './global.scss';
import Game from './pages/Game';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { GameContextProvider } from './context/GameContext';

function App() {

  return (
    <GameContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game' element={<Game />} />
        </Routes>
      </BrowserRouter>
     </GameContextProvider>
  );
}

export default App;
