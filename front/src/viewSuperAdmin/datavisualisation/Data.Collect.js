import React, { useState } from 'react';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CCol,
    CRow,
    CCard,
    CCardBody,
    CCardHeader
} from '@coreui/react';
import {
    CChartBar,
    CChartLine,

} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import { cilObjectGroup } from '@coreui/icons';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { settingsDataCollecteds } from 'src/services/Settings.iot';
import GenericTable from 'src/components/Generic.Table';

function DataCollect({ selectedSensors }) {
    const [visible, setVisible] = useState(false);
    const [list, setlist] = useState([])
    const OpenModalProduct = async () => {
        setVisible(true);
        getListData();
    };
    const columns = [
        { label: '#', field: 'index' },
        { label: 'measurement', field: 'measurement' },
        { label: 'measurement_accuracy', field: 'measurement_accuracy' },
        { label: 'unit', field: 'unit' },
        { label: 'status', field: 'status' },
        { label: 'date', field: 'created_at' },

    ]
    const getListData = async () => {
        try {
            const list = await settingsDataCollecteds.getDataCollectedbySensors(selectedSensors.address_mac);
            if (list) {
                setlist(list?.data);

            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };


    return (
        <>
            <CButton color="success" onClick={() => OpenModalProduct()}>
                <CIcon icon={cilObjectGroup} />
            </CButton>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
                fullscreen
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">@IP {selectedSensors.address_ip}
                     </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol md={5} className="position-relative">
                            <GenericTable columns={columns} data={list} />
                        </CCol>
                        <CCol md={7} className="position-relative">


                            <CRow>
                                <CCol xs={6}>
                                    <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                        <div className="text-body-secondary text-truncate small">Last register {selectedSensors.description}</div>
                                        <div className="fs-5 fw-semibold">{list[0]?.measurement}</div>
                                    </div>
                                </CCol>
                                <CCol xs={6}>
                                    <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                        <div className="text-body-secondary text-truncate small">Last register {selectedSensors.description}</div>
                                        <div className="fs-5 fw-semibold">{list[1]?.measurement}</div>
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={6}>
                                    <div className="border-start border-start-4 border-start-info py-1 px-3">
                                        <div className="text-body-secondary text-truncate small">number of measurements in 15 days</div>
                                        <div className="fs-5 fw-semibold">9,123</div>
                                    </div>
                                </CCol>
                                <CCol xs={6}>
                                    <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                        <div className="text-body-secondary text-truncate small">
                                          Time SLOT                                           
                                        </div>
                                        <div className="fs-5 fw-semibold">5 ms</div>
                                    </div>
                                </CCol>
                                <CCol xs={6}>
                                    <CCard className="mb-4">
                                        <CCardHeader>{selectedSensors.description}</CCardHeader>
                                        <CCardBody>
                                            <CChartBar
                                                data={{
                                                    labels: [0,1,2,3,4,5,6,7,8,9,10],
                                                    datasets: [
                                                        {
                                                            label: 'Last 10 registered',
                                                            backgroundColor: '#f87979',
                                                            data: list.map(e=>e.measurement),
                                                        },
                                                    ],
                                                }}
                                                labels="months"
                                            />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol xs={6}>
                                    <CCard className="mb-4">
                                        <CCardHeader>{selectedSensors.description}</CCardHeader>
                                        <CCardBody>
                                            <CChartLine
                                                data={{
                                                    labels: [0,1,2,3,4,5,6,7,8,9,10],
                                                    datasets: [
                                                        {
                                                            label: 'threshold',
                                                            backgroundColor: 'rgba(220, 220, 220, 0.2)',
                                                            borderColor: 'rgba(220, 220, 220, 1)',
                                                            pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                                                            pointBorderColor: '#fff',
                                                            data: list.map(e=>e.measurement),
                                                        },
                                                        // {
                                                        //     label: 'threshold',
                                                        //     backgroundColor: 'rgba(151, 187, 205, 0.2)',
                                                        //     borderColor: 'rgba(151, 187, 205, 1)',
                                                        //     pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                                                        //     pointBorderColor: '#fff',
                                                        //     data: [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                                                        // },
                                                    ],
                                                }}
                                            />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol xs={6}>
                                    <CCard className="mb-4">
                                        <CCardHeader>Chart T</CCardHeader>
                                        <CCardBody>
                                            <HighchartsReact
                                                highcharts={Highcharts}
                                                options={{
                                                    title: {
                                                        text: ''
                                                    },
                                                    series: [{
                                                        data: list.map(e=>e.measurement),

                                                    }]
                                                }}
                                            />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCol>


                    </CRow>


                </CModalBody>
            </CModal>
        </>
    );
}

DataCollect.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedSensors: PropTypes.object,
};

export default DataCollect;
