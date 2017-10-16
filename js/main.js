import {getWelcomeScreenMarkup} from './welcome-screen';
import renderScreen from './render-screen';
import {initialState} from './data/data';

renderScreen(getWelcomeScreenMarkup(initialState));

