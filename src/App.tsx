import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import ImageContainer from './component/Image/ImageContainer';
import Footer from './component/Footer';
import './App.css';
import {
    ChangeEvent,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import getImages from './api/getImages';
import EmptyResult from './component/EmptyResult';
import Title from './component/Title';
import Search from './component/Search/Search';
import { DataRequestType, IGetImagesResponse } from './types';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

const Header = styled.div`
    position: relative;
    width: 100%;
    background-color: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 120px 32px 16px 32px;
`;
type ParamType = (e: ChangeEvent<HTMLInputElement>) => void;
const ParamsContext = createContext<ParamType | null>(null);

function App() {
    const [query, setQuery] = useState('');

    const [params, setParams] = useState<DataRequestType>({
        orientation: 'all',
        order: 'popular',
        page: 1,
        per_page: 20,
    });

    const [data, setData] = useState<IGetImagesResponse>({
        total: 0,
        totalHits: 0,
        hits: [],
    });

    const { orientation, order, per_page, page } = params;

    const onSetParams = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        let value = name === 'page' ? parseInt(e.target.value) : e.target.value;
        setParams((prev) => ({ ...prev, [name]: value }));
    };

    const onEnter = (input: string) => {
        setQuery(input);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getImages({
                q: query,
                orientation,
                order,
                per_page: per_page.toString(),
                page: page.toString(),
            });
            // 값 갱신에서 값 누적으로 변경해야 함
            //setData(data);
            if (1 === page && data) {
                setData(data);
            } else if (data) {
                setData((prevData) => ({
                    ...prevData,
                    hits: [...prevData.hits, ...data.hits],
                }));
            }
        };

        fetchData();
    }, [query, orientation, order, page, per_page]);

    useEffect(() => {
        setParams((prev) => ({ ...prev, page: 1 }));
    }, [query, orientation, order, per_page]);

    const target = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const onIncreaePage = () => {
            setParams((prev) => ({
                ...prev,
                page: prev.page + 1,
            }));
        };

        const callback: IntersectionObserverCallback = ([entry]) => {
            if (!target.current) {
                return;
            }
            if (entry.isIntersecting) {
                onIncreaePage();
            }
        };
        const observer = new IntersectionObserver(callback, {
            threshold: 1,
        });
        if (target.current) {
            observer.observe(target.current);
        }
    }, []);

    const numberOfPages = Math.ceil(data.totalHits / per_page);
    return (
        <>
            <Container>
                <ParamsContext.Provider value={onSetParams}>
                    <Header>
                        <Title />
                        <Search onEnter={onEnter} />
                    </Header>
                    {/* <Hero onEnter={onEnter} /> */}
                    <ImageContainer data={data} />
                    {numberOfPages !== page && (
                        <div ref={target} onClick={(e) => console.log(e)}>
                            <EmptyResult isLoading={data.totalHits} />
                        </div>
                    )}
                    <Footer />
                    <ToggleThemeButton />
                </ParamsContext.Provider>
            </Container>
        </>
    );
}

export default App;

export const useSetParams = () => useContext(ParamsContext);
