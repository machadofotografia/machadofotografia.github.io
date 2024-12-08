
import React from 'react';
import ImageContainer from './ImageContainer';
import './page.module.css';

const App = () => {
    return (
        <div className="App">
            {/* ...existing code... */}
            <ImageContainer src="path/to/image.jpg" alt="Description" overlayText="Overlay Text" />
            {/* ...existing code... */}
        </div>
    );
};

export default App;