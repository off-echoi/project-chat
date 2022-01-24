import { Navigate, Route, Routes } from 'react-router';
import { AppProvider } from './context';
import List from './route/list';
import Room from './route/room';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Navigate replace to="/list" />} />
        <Route path="/list" element={<List />} />
        <Route path="/room">
          <Route path=":room_id" element={<Room />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
