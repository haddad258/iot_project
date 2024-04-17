import api from '../../Api/api';
import { ApiSettingsIOT } from '../../Api/config';

const getGateway = async () => {
    try {
        const result = await api.get(ApiSettingsIOT.api_Gateway);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addGateway = async (status) => {
    try {
        const result = await api.post(ApiSettingsIOT.api_Gateway, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateGateway = async (data) => {
    try {
        const result = await api.put(`${ApiSettingsIOT.api_Gateway}${data.id}`, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updateGatewayCompose = async (data,id) => {
    try {
        const result = await api.put(`${ApiSettingsIOT.api_Gateway}/compose/${id}`, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateGatewayAssign = async (data,id) => {
    try {
        const result = await api.put(`${ApiSettingsIOT.api_Gateway}/assign/${id}`, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};


const AdminFun = {
    getGateway,
    addGateway,
    updateGateway,
    updateGatewayCompose,
    updateGatewayAssign
    
};

export default AdminFun;
