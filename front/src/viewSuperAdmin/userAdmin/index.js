import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsUserAdmins } from 'src/services/SupperSettings/index';
import GenericTable from 'src/components/Generic.Table';
import UserAdminsC from './UserAdmin'
import PasswordAdmin from './Password'
import StatusRow from "src/components/IOT/status.row"
const UserAdmins = () => {
    const [List, setList] = useState([]);

    const fetchUserAdmins = async () => {
        try {
            const list = await settingsUserAdmins.getUsersAdmin();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    useEffect(() => {
        fetchUserAdmins();
    }, []);

    const columns = [
        { label: '#', field: 'index' },
        { label: 'name', field: 'name' },
        { label: 'description', field: 'description'},
        {
            label: 'Actions',
            field: 'actions',
            render: (item) => 
            (
                <>
                
            <UserAdminsC refresh={()=>fetchUserAdmins()} selectedUserAdmin={item} />
            <PasswordAdmin refresh={()=>fetchUserAdmins()} selectedUserAdmin={item} />
            <StatusRow refresh={() => fetchUserAdmins()} status={item.status} data={"users"}  id={item.id} />
              
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
                        <strong>UserAdmins </strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                        <UserAdminsC refresh={()=>fetchUserAdmins()} />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Settings UserAdmins</strong>
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

export default UserAdmins;
