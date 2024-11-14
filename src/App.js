import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/ebank/login" component={Login} />
      <Route exact path="/" component={Home} />

      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
