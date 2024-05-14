
  import React, { useEffect, useState } from 'react';
  import {
      CRow,
      CCol,
      CCard,
      CCardHeader,
      CCardBody,
  } from '@coreui/react';
import { settingsTestAPIs } from 'src/services/Settings.iot/index';
import GenericTable from 'src/components/Generic.Table';
  import TestAPIsC from './TestAPI'
  import i18n from 'src/i18n';
  const TestAPIs = () => {
      const [List, setList] = useState([]);
  
      const fetchTestAPIs = async () => {
          try {
              const list = await settingsTestAPIs.getTestAPI();
              if (list) {
                  setList(list);
              }
          } catch (error) {
              console.error('Error fetching admin list:', error);
          }
      };
      useEffect(() => {
          fetchTestAPIs();
      }, []);
  
      const columns = [
          { label: '#', field: 'index' },
          { label: i18n.t('nameInputLabel'), field: 'title' },
          { label: i18n.t('descriptionInputLabel'), field: 'description' },
          { label: i18n.t('appreciationInputLabel'), field: 'appreciation' },
          
          {
              label:  i18n.t('actionLabel'),
              field: 'actions',
              render: (item) => <TestAPIsC refresh={()=>fetchTestAPIs()} selectedTestAPIs={item} />,
          },
      ];
  
      return (
          <CCard className="mb-4">
              <CCardHeader>
                  <CRow className="align-items-center">
                      <CCol md="6" xs="12">
                          <strong>   { i18n.t('TestAPIsTableTitle')}</strong>
                      </CCol>
                      <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                          <TestAPIsC refresh={()=>fetchTestAPIs()} />
                      </CCol>
                  </CRow>
              </CCardHeader>
              <CCardBody>
                  <CRow>
                      <CCol xs="12">
                          <CCard className="mb-4">
                              <CCardHeader>
                          <strong>{ i18n.t('TestAPIsList')}</strong>
                              </CCardHeader>
                              <CCardBody>
                                      <GenericTable columns={columns} data={List} />
                              </CCardBody>
                          </CCard>
                      </CCol>
                  </CRow>
              </CCardBody>
          </CCard>
      );
  };
  
  export default TestAPIs;
  
  