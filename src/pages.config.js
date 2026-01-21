import About from './pages/About';
import AdminPanel from './pages/AdminPanel';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import GoogleVerification from './pages/GoogleVerification';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminPanel": AdminPanel,
    "Contact": Contact,
    "Home": Home,
    "Properties": Properties,
    "PropertyDetail": PropertyDetail,
    "GoogleVerification": GoogleVerification,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};