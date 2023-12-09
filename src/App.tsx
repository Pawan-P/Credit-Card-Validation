// App.tsx

import React from 'react';
import CheckoutForm from './Components/CheckoutForm';
import theme from './Utilities/theme';
import { ThemeProvider } from '@material-ui/styles';
import Layout from './Components/Layout';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <CheckoutForm />
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;
