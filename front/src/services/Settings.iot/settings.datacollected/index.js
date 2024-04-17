import api from '../../Api/api';
import { ApiSettingsIOT } from '../../Api/config';

const getDataCollected = async () => {
    try {
        const result = await api.get(ApiSettingsIOT.api_DataCollected);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const addDataCollected = async (status) => {
    try {
        const result = await api.post(ApiSettingsIOT.api_DataCollected, status);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const updateDataCollected = async (data) => {
    try {
        const result = await api.put(`${ApiSettingsIOT.api_DataCollected}${data.id}`, data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const getDataCollectedbySensors = async (id) => {
    try {
        const result = await api.get(ApiSettingsIOT.api_DataCollected+"bysensors/"+id);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};


const AdminFun = {
    getDataCollected,
    addDataCollected,
    updateDataCollected,
    getDataCollectedbySensors
};

export default AdminFun;
