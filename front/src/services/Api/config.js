const API_URL = process.env.REACT_APP_API_URL;
const Apis = {
  UserLoginAPI: `${API_URL}/api/root/login`,
  UserLoginEmployeAPI: `${API_URL}/api/root/employe/login`,
  api_updatecridentials: `${API_URL}/api/root/update/credentials`,


};
const ApiSupperSettings = {

  api_UsersAdmin: `${API_URL}/api/users/admin`,
  api_UsersAdmin_update: `${API_URL}/api/users/admin/`,
  api_Privilege: `${API_URL}/api/privileges/list/`,



};
const ApiSettingsIOT = {
  api_Sensor: `${API_URL}/api/sensors/list/`,
  api_Gateway: `${API_URL}/api/gateways/list/`,
  api_Order: `${API_URL}/api/orders/index/`,
  api_DataCollected: `${API_URL}/api/data/collect/from/sensors/`,
  

};
export { API_URL, Apis, ApiSupperSettings ,ApiSettingsIOT};