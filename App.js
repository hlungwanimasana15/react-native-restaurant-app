import { store } from './Slices/Store'
import { Provider } from 'react-redux'
import { StripeProvider } from '@stripe/stripe-react-native';
import Navigation from './Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51O0fWbFLBlgdGDy2gYhAzyg8sbLzN3ZhRvgKdM1srkOSxHT3TFEqcFqcV9Iwg450jNWMKzlStz8CefPnYR4Xi3Ha00z5e1EcSF">
        <Navigation />
      </StripeProvider>
    </Provider>

  );
}


