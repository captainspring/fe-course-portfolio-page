import { isSafariInit } from './utils/isSafari';

import { handleMobileMenu, handleScrollHeader } from './../components/header/scripts';
import { initPortfolioButtons } from './../components/portfolio/scripts';

isSafariInit();

handleMobileMenu();
handleScrollHeader();
initPortfolioButtons();
