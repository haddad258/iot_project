import React, { useState } from 'react';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import { cilAlignLeft } from '@coreui/icons';
import { settingsSensors } from 'src/services/Settings.iot/index';
import GenericTable from 'src/components/Generic.Table';
// import { settingsProducts } from 'src/services';
function ViewSensorCompose({ selectedGateway }) {
    const [visible, setVisible] = useState(false);
    const [List, setList] = useState([]);


    const fetchSensors = async () => {
        try {
            const list = await settingsSensors.getSensorbyGatway(selectedGateway.id);
            if (list) {
                setList(list?.data?.sensors);
                console.log(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    const OpenModalProduct = async () => {
        setVisible(true);
        fetchSensors();
    };


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
    ];
    return (
        <>
            <CButton color="success" onClick={() => OpenModalProduct()}>
                <CIcon icon={cilAlignLeft} />
            </CButton>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
                size="xl"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel"> {selectedGateway.address_mac} :List sensors   Gateways </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol md="6" xs="12">
                                    <strong>Sensors </strong>
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
                </CModalBody>
            </CModal>
        </>
    );
}

ViewSensorCompose.propTypes = {
    selectedGateway: PropTypes.object,
};

export default ViewSensorCompose;
