import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { createContext, useContext, useEffect, useState } from 'react';
import getImages from './api/getImages';

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
        page: 1,
        per_page: 20,
    });

    const [data, setData] = useState({});

    const { orientation, order, per_page, page } = params;

    const onSetParams = (e) => {
        const { name } = e.target;
        let value = name === 'page' ? parseInt(e.target.value) : e.target.value;
        setParams((prev) => ({ ...prev, [name]: value }));
    };

    const onEnter = (input) => {
        setQuery(input);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getImages({
                q: query,
                orientation,
                order,
                per_page,
                page,
            });
            setData(data);
        };

        fetchData();
    }, [query, orientation, order, page, per_page]);

    const numberOfPages = data.totalHits
        ? Math.ceil(data.totalHits / per_page)
        : 0;

    const onIncreaePage = () => {
        setParams((prev) => ({ ...prev, page: page + 1 }));
    };

    const onDecreaePage = () => {
        setParams((prev) => ({ ...prev, page: page - 1 }));
    };

    return (
        <>
            <Container>
                <ParamsContext.Provider value={onSetParams}>
                    <Hero onEnter={onEnter} />
                    <ResultContainer
                        data={data}
                        numberOfPages={numberOfPages}
                        onIncreaePage={onIncreaePage}
                        onDecreaePage={onDecreaePage}
                        page={page}
                    />
                    <Footer />
                    <ToggleThemeButton />
                </ParamsContext.Provider>
            </Container>
        </>
    );
}

export default App;

export const useSetParams = () => useContext(ParamsContext);
