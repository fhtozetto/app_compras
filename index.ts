import { registerRootComponent } from 'expo';

import { Home } from './src/app/Home';

// Registra a tela principal como ponto de entrada da aplicacao Expo.
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Home);
