import {getWelcomeScreenMarkup} from './templates/welcome-screen';
import renderScreen from './render-screen';
import {initialState} from './data/initial-data';

renderScreen(getWelcomeScreenMarkup(initialState));

