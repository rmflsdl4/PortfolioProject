// App.jsx
import React, { useState } from 'react';
import Header from './modules/Header';
import Body from './modules/Body';
import Footer from './modules/Footer';
import Nav from './modules/Nav';

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Header />
            <Body setMenuOpen={setMenuOpen}/>
            <Footer />
            <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </>
    );
}

export default App;
