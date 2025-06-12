import { api, apiSufix } from './api';

const getUfrjpageInformation = async() => {
    return await api.get(`/${apiSufix.ufrj}`);
}

export { getUfrjpageInformation };