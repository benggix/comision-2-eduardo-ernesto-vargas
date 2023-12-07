import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { AppRouter } from './AppRouter'
import "./styles/fontAll.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRouter/>
  </BrowserRouter>,
)
