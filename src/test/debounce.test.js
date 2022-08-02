import { debounce } from '../component/utils/debounce';

jest.useFakeTimers();

describe('test debounce()', () => {
    let func;

    beforeEach(() => {
        func = jest.fn();
    });

    test('should execute only one', () => {
        for (let i = 0; i < 1000; i++) {
            debounce(func, 100);
        }
        jest.runAllTimers(); // exhaust all pending tasks
        expect(func).toBeCalledTimes(1);
    });
});
