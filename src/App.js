import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import CreateUser from "./components/create-user";
import ExerciseList from './components/exercise-list';
import EditExercise from './components/edit-exercise';
import CreateExercise from "./components/create-exercise";
import Info from "./components/info";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ExerciseList />} />
        <Route path="/edit/:id" element={<EditExercise />} />
        <Route path="/create" element={<CreateExercise />} />
        <Route path="/user" element={<CreateUser />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </Router>
  );
}

export default App;
