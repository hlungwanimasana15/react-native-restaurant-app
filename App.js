import { store } from './Slices/Store'
import { Provider } from 'react-redux'
import { StripeProvider } from '@stripe/stripe-react-native';
import Navigation from './Navigation';

//redux pesist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

let persistor = persistStore(store)

export default function App() {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <StripeProvider publishableKey="pk_test_51O0fWbFLBlgdGDy2gYhAzyg8sbLzN3ZhRvgKdM1srkOSxHT3TFEqcFqcV9Iwg450jNWMKzlStz8CefPnYR4Xi3Ha00z5e1EcSF">
        <Navigation />
      </StripeProvider>
      </PersistGate>
    </Provider>

  );
}


