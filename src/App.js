import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useState } from 'react';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [query, setQuery] = useState('');

    const onEnter = (input) => {
        setQuery(input);
    };

    return (
        <>
            <Container>
                <Hero onEnter={onEnter} />
                <ResultContainer query={query} />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
