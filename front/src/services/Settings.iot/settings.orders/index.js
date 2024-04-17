import api from '../../Api/api';
import { ApiSettingsIOT } from '../../Api/config';

const getOrder = async () => {
    try {
        const result = await api.get(ApiSettingsIOT.api_Order);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addOrder = async (status) => {
    try {
        const result = await api.post(ApiSettingsIOT.api_Order, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateOrder = async (data) => {
    try {
        const result = await api.put(`${ApiSettingsIOT.api_Order}${data.id}`, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getOrderAssign = async (id) => {
    try {
        const result = await api.get(ApiSettingsIOT.api_Order+"list/bygateway/"+id);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};


const AdminFun = {
    getOrder,
    addOrder,
    updateOrder,
    getOrderAssign
};

export default AdminFun;
