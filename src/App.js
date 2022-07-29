import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { createContext, useContext, useState } from 'react';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

const ParamsContext = createContext();
function App() {
    const [query, setQuery] = useState('');
    const [params, setParams] = useState({
        orientation: '',
        order: '',
    });

    const onClickSearchOptions = (e) => {
        const { name, value } = e.target;
        setParams((prev) => ({ ...prev, [name]: value }));
    };

    const onEnter = (input) => {
        setQuery(input);
    };

    return (
        <>
            <Container>
                <ParamsContext.Provider value={{ onClickSearchOptions }}>
                    <Hero onEnter={onEnter} />
                </ParamsContext.Provider>
                <ResultContainer
                    q={query}
                    params={params}
                    // orientation={orientation}
                    // order={order}
                />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;

export const useURLParams = () => useContext(ParamsContext);
