import Main from './Components/Main/Main'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {ConfigureStore} from './Redux/configureStore'

const store = ConfigureStore();

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
      
      <div className="container">
        

        <Main/>

        </div>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
