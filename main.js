import { showView } from './utils/dom.js';
import { getCookie } from './utils/cookies.js';
import './modules/login.js';
import './modules/register.js';
import './modules/panel.js';
import { hydratePanel } from './modules/panel.js';

const logged = getCookie('username') != ""; 
if(logged){
    showView('panel-view');
    hydratePanel();
} else {
    showView('login-view');
}




