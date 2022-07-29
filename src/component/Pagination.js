import styled from 'styled-components';
import { ReactComponent as PrevIcon } from '../asset/prev.svg';
import { ReactComponent as NextIcon } from '../asset/next.svg';
import { useSetParams } from '../App';

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px;
    color: var(--text); ;
`;

const PageSelect = styled.select`
    cursor: pointer;
    background-color: var(--primary);
    border: none;
    font-size: 16px;
    color: var(--highlight);
    font-weight: bold;
    font-family: inherit;
    &:focus {
        outline: none;
    }
`;

const Pagination = ({ numberOfPages, onIncreaePage, onDecreaePage, page }) => {
    const setParams = useSetParams();
    return (
        <Nav>
            {page !== 1 && (
                <PrevIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
                    onClick={onDecreaePage}
                />
            )}
            {`총 ${numberOfPages} 중 `}
            <PageSelect name="page" value={page} onChange={setParams}>
                {Array(numberOfPages)
                    .fill()
                    .map((_, index) => (
                        <option value={index + 1} key={index + 1}>
                            {index + 1}
                        </option>
                    ))}
            </PageSelect>
            페이지
            {page !== numberOfPages && (
                <NextIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
                    onClick={onIncreaePage}
                />
            )}
        </Nav>
    );
};

export default Pagination;
