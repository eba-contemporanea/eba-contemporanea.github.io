const cases = {
    GET_UFRJPAGE_INFO: 'GET_UFRJPAGE_INFO',
};

const initialState = {
    galleryImages: [],
    references: [],
    timeline: [],
    boldTexts: [],
    underlinedTexts: [],
}

const UfrjpageReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case cases.GET_UFRJPAGE_INFO:
            return payload.info;
        default:
            return state;
    }
}

export default UfrjpageReducers;
export { cases, initialState };