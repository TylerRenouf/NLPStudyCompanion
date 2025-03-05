import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';




const NavbarContentContext = createContext();
function useNavbarContent() {
    return useContext(NavbarContentContext);
}


NavbarContentProvider.propTypes = { children: PropTypes.node.isRequired }
function NavbarContentProvider({ children }) {
    const [navbarContent, setNavbarContent] = useState(null);

    return (
        <NavbarContentContext.Provider value={{ navbarContent, setNavbarContent }}>
            {children}
        </NavbarContentContext.Provider>
    );
}

export { useNavbarContent, NavbarContentProvider }