
  import api from '../../Api/api';
import { ApiSettingsIOT } from '../../Api/config';
  
  const getTestAPI = async () => {
      try {
          const result = await api.get(ApiSettingsIOT.api_TestAPI);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  const addTestAPI = async (status) => {
      try {
        alert((ApiSettingsIOT.api_TestAPI))
          const result = await api.post(ApiSettingsIOT.api_TestAPI, status);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  const updateTestAPI = async (data) => {
      try {
          const result = await api.put(ApiSettingsIOT.api_TestAPI+'/'+data.id, data);
          return result.data.error ? null : result.data;
      } catch (error) {
          console.error(error);
          return null;
      }
  };
  
  
  
  const TestAPIFun = {
      getTestAPI,
      addTestAPI,
      updateTestAPI,
  };
  
  export default TestAPIFun;
  

  