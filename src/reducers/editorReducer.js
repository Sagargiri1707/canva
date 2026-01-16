import { ACTIONS } from '../constants';

export const initialState = {
    htmlContent: '',
    currentFileName: 'document.html',
    statusMessage: '',
    errorMessage: '',
    isLoading: false,
    showImagePicker: false,
    selectedImage: null
};

export function editorReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_HTML_CONTENT:
            return {
                ...state,
                htmlContent: action.payload,
                isLoading: false,
                errorMessage: ''
            };

        case ACTIONS.SET_FILE_NAME:
            return {
                ...state,
                currentFileName: action.payload
            };

        case ACTIONS.SET_STATUS:
            return {
                ...state,
                statusMessage: action.payload,
                errorMessage: ''
            };

        case ACTIONS.SET_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                statusMessage: '',
                isLoading: false
            };

        case ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        case ACTIONS.SHOW_IMAGE_PICKER:
            return {
                ...state,
                showImagePicker: true,
                selectedImage: action.payload
            };

        case ACTIONS.HIDE_IMAGE_PICKER:
            return {
                ...state,
                showImagePicker: false,
                selectedImage: null
            };

        case ACTIONS.CLEAR_STATUS:
            return {
                ...state,
                statusMessage: ''
            };

        case ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                errorMessage: ''
            };

        default:
            return state;
    }
}
