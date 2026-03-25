import About from './pages/About';
import Contact from './pages/Contact';
import GoogleVerification from './pages/GoogleVerification';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Contact": Contact,
    "GoogleVerification": GoogleVerification,
    "Home": Home,
    "Properties": Properties,
    "PropertyDetail": PropertyDetail,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};