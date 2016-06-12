import React from 'react'
import { render } from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './configureStore'
import RiderAI from './components/RiderAI'
injectTapEventPlugin();


const store = configureStore()

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()} >
    <Provider store={store}>
      <RiderAI />
    </Provider>
  </MuiThemeProvider>
);

render(
  <App />,
  document.getElementById('root')
);
