import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsGateways } from 'src/services/Settings.iot/index';
import GenericTable from 'src/components/Generic.Table';
import GatewaysC from './Gateway'
import ViewSensorCompose from './view.compostions';
import ViewOrdersAssign from './view.Assign';
const Gateways = () => {
    const [List, setList] = useState([]);

    const fetchGateways = async () => {
        try {
            const list = await settingsGateways.getGateway();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    useEffect(() => {
        fetchGateways();
    }, []);

    const columns = [
        { label: '#', field: 'index' },
        { label: 'address_ip', field: 'address_ip' },
        { label: 'address_mac', field: 'address_mac' },
        { label: 'Gateway_manufacturer', field: 'Gateway_manufacturer' ,},
        { label: 'model', field: 'model' ,
        render: (item) => `${item.model}-${item.type} (${item.status})`
    },
        { label: 'description', field: 'description'},
        {
            label: 'Actions',
            field: 'actions',
            render: (item) => 
           ( 
           <>
            <GatewaysC refresh={()=>fetchGateways()} selectedGateway={item} />
            <ViewSensorCompose refresh={()=>fetchGateways()} selectedGateway={item} />
            <ViewOrdersAssign refresh={()=>fetchGateways()} selectedGateway={item} />
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
                        <strong>Gateways </strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                        <GatewaysC refresh={()=>fetchGateways()} />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Settings Gateways</strong>
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

export default Gateways;
