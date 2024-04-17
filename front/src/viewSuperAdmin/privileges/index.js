import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsPrivileges } from 'src/services/SupperSettings/index';
import GenericTable from 'src/components/Generic.Table';
import PrivilegesC from './Privilege'
const Privileges = () => {
    const [List, setList] = useState([]);

    const fetchPrivileges = async () => {
        try {
            const list = await settingsPrivileges.getPrivilege();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    useEffect(() => {
        fetchPrivileges();
    }, []);

    const columns = [
        { label: '#', field: 'index' },
        { label: 'privilege', field: 'privilege' },
        { label: 'description', field: 'description'},
        {
            label: 'Actions',
            field: 'actions',
            render: (item) => 
           ( 
           <>
            <PrivilegesC refresh={()=>fetchPrivileges()} selectedPrivilege={item} />
            </>
            )
            ,
        },
    ];

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>Privileges </strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                        <PrivilegesC refresh={()=>fetchPrivileges()} />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Settings Privileges</strong>
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

export default Privileges;
