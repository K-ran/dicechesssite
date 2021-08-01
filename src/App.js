
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import MainContent from './components/main_content/MainContent';


function App() {
  return (
    <div className="app">
      <Navbar/>
      <MainContent />
      <Footer/>
    </div>
  );
}

export default App;
