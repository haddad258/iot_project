import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsSensors } from 'src/services/Settings.iot/index';
import GenericTable from 'src/components/Generic.Table';
import SensorsC from './Sensors'
const Sensors = () => {
    const [List, setList] = useState([]);

    const fetchSensors = async () => {
        try {
            const list = await settingsSensors.getSensor();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    useEffect(() => {
        fetchSensors();
    }, []);

    const columns = [
        { label: '#', field: 'index' },
        { label: 'address_ip', field: 'address_ip' },
        { label: 'address_mac', field: 'address_mac' },
        { label: 'description', field: 'description' },
        {
            label: 'Thresholds',
            field: 'Thresholds_min',
            render: (item) => `${item.Thresholds_min}-${item.Thresholds_max} (${item.measurement_unit})`

        },
        {
            label: 'Actions',
            field: 'actions',
            render: (item) =>
            (
                <>
                    <SensorsC refresh={() => fetchSensors()} selectedSensor={item} />
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
                        <strong>Sensors </strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                        <SensorsC refresh={() => fetchSensors()} />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Settings Sensors</strong>
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

export default Sensors;
