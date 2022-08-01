let debounceTimer;
export const debounce = (callback, time, e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        callback(e);
    }, time);
};
