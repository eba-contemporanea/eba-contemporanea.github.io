import { api, apiSufix } from './api';

const getEbapageInformation = async() => {
    return await api.get(`/${apiSufix.eba}`);
}

export { getEbapageInformation };