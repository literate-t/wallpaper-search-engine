import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../asset/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';

const SearchTagContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    justify-content: center;
`;

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const SearchInput = styled.input`
    background: transparent;
    font-size: 16px;
    outline: none;
    color: #5e5e5e;
    border: none;
    flex: auto;
    margin-left: 8px;
`;

const SearchOptionButton = styled.p`
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: #5e5e5e;
`;

const Search = ({ onEnter }) => {
    const [searchOption, setSearchOption] = useState(true);

    let tags = localStorage.getItem('tags');
    tags = tags ? JSON.parse(tags) : [];
    const [searchTags, setSearchTags] = useState(tags);

    const refInput = useRef();

    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };

    const updateSearchInput = (value) => {
        refInput.current.value = value;
    };

    const updateTags = (currentInput) => {
        const result = searchTags.find((item) => item === currentInput);
        if (!result) {
            setSearchTags((prev) => [...prev, currentInput]);
        }
    };

    const onSearch = (e) => {
        if ('Enter' === e.code) {
            const currentInput = e.target.value;

            onEnter(currentInput);

            updateTags(currentInput);

            updateSearchInput('');
        }
    };

    const onClickTag = (tag) => {
        onEnter(tag);

        updateSearchInput(tag);
    };

    const onClickDelete = (index) => {
        setSearchTags((prev) => prev.filter((_, idx) => index !== idx));
    };

    useEffect(() => {
        localStorage.setItem('tags', JSON.stringify(searchTags));
    }, [searchTags]);

    return (
        <>
            <SearchBoxContainer>
                <SearchInputContainer>
                    <SearchIcon width="24" fill="#5e5e5e" />
                    <SearchInput
                        placeholder="검색어 입력 후 ENTER"
                        onKeyDown={onSearch}
                        ref={refInput}
                        name="q"
                    />
                    <SearchOptionButton onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionButton>
                </SearchInputContainer>
                {/* 마운트가 다시 되면서 기존 선택값이 사라짐 */}
                {/* {searchOption && <SearchOption />} */}
                {/* 새로 마운트되지 않게 숨김 */}
                <div hidden={searchOption}>
                    <SearchOption />
                </div>
            </SearchBoxContainer>
            <SearchTagContainer>
                {searchTags.map((tag, index) => (
                    <SearchTag
                        key={tag + index}
                        tag={tag}
                        index={index}
                        onClickTag={onClickTag}
                        onClickDelete={onClickDelete}
                    />
                ))}
            </SearchTagContainer>
        </>
    );
};

export default Search;
