const cases = {
    GET_EBAPAGE_INFO: 'GET_EBAPAGE_INFO',
};

const initialState = {
    galleryImages: [],
    references: [],
    timeline: [],
    boldTexts: [],
    underlinedTexts: [],
}

const EbapageReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case cases.GET_EBAPAGE_INFO:
            return payload.info;
        default:
            return state;
    }
}

export default EbapageReducers;
export { cases, initialState };