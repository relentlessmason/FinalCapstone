import Main from './Components/Main/Main'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {ConfigureStore} from './Redux/configureStore'
import Navbar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

const store = ConfigureStore();

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
      
      <div className="container">
        
        <Header />
        <Main/>
        <Footer />
        <div className="spacer"> .</div>
        </div>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
