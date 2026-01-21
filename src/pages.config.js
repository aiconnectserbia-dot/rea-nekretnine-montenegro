import About from './pages/About';
import AdminPanel from './pages/AdminPanel';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import googlef043ef210742dac4 from './pages/googlef043ef210742dac4';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminPanel": AdminPanel,
    "Contact": Contact,
    "Home": Home,
    "Properties": Properties,
    "PropertyDetail": PropertyDetail,
    "googlef043ef210742dac4": googlef043ef210742dac4,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};