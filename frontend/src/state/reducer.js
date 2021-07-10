export const initialstate = {
    profile: null,
    pageReload: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_Profile":
            return {
                ...state,
                profile: action.profile,
            };
        case "PAGE_RELOAD":
            return {
                ...state,
                pageReload: action.pageReload,
            };
        default:
            return state;
    }
};

export default reducer;