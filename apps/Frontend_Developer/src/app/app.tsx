import { QueryClientProvider } from '../query';
import { Approuter } from '../router';

function App() {
  return (
    <QueryClientProvider>
      <Approuter />
    </QueryClientProvider>
  );
}

export default App;
