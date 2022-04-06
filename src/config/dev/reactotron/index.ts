import {NativeModules, Platform} from 'react-native';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';

let scriptHostname = null;

const {scriptURL} = NativeModules.SourceCode;
scriptHostname = scriptURL.split('://')[1].split(':')[0];

function connectConsoleToReactotron() {
  const oldConsoleLog = console.log;
  console.log = (...args) => {
    oldConsoleLog(...args);
    Reactotron.display({
      name: 'Console.log',
      value: args,
      preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
    });
  };
}

const tron = Reactotron.configure({
  name: 'Photo Downloader App',
  host: Platform.OS === 'ios' ? scriptHostname : 'localhost',
})
  .useReactNative()
  .use(reduxPlugin());

tron.connect();

connectConsoleToReactotron();
tron.clear!();

export default tron;
