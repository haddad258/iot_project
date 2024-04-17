import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CFormSelect
} from '@coreui/react';
import { settingsGateways, settingsOrders, settingsSensors } from 'src/services/Settings.iot/index';
import i18n from 'src/i18n';
import { renderInformations } from 'src/components/IOT/renderInformations';
import GenericTable from 'src/components/Generic.Table';
import DataCollect from './Data.Collect'
const DataVisualisation = () => {
    const [List, setList] = useState([]);
    const [Listorders, setListorders] = useState([]);
    const [Listsensors, setListsensors] = useState([]);
    const [selectedGW, setselectedGW] = useState({});

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
    const fetchOrders = async () => {
        try {
            const list = await settingsOrders.getOrder();
            if (list) {
                setListorders(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchGateways();
    }, []);

    const fetchSensors = async (value) => {
        try {
            const selected = List.filter(e => e.id === value)
            setselectedGW(selected[0])
            const list = await settingsSensors.getSensorbyGatway(value);
            if (list) {
                setListsensors(list?.data?.sensors);
                console.log(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
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
        {
            label: 'Thresholds',
            field: 'Thresholds_min',
            render: (item) => <DataCollect  selectedSensors={item} />

        },
        
    ];
    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>View Data </strong>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong> View Data </strong>
                            </CCardHeader>
                            <CCardBody>
                            <CRow>
                                <CCol md={6} className="position-relative">
                                    {renderInformations(i18n.t('address_ip'), selectedGW?.address_ip)}
                                    {renderInformations(i18n.t('address_mac'), selectedGW?.address_mac)}
                                    {renderInformations(i18n.t('description'), selectedGW?.description)}
                                    {renderInformations(i18n.t('name'), selectedGW?.name)}
                                </CCol>
                                <CCol md={6} className="position-relative">
                                    {renderInformations(i18n.t('address_ip'), selectedGW?.address_ip)}
                                    {renderInformations(i18n.t('address_mac'), selectedGW?.address_mac)}
                                    {renderInformations(i18n.t('description'), selectedGW?.description)}
                                    {renderInformations(i18n.t('name'), selectedGW?.name)}
                                </CCol>
                            </CRow>

                                <CRow>

                                    <CCol md={6} className="position-relative">
                                        <CFormSelect
                                            onChange={(e) => fetchSensors(e.target.value)}
                                            id="validationTooltip04"
                                        >
                                            <option value={""}> Please choose Gateways</option>
                                            {List?.map((gatway, index) => (
                                                <option key={`type${index}`} value={gatway.id}>
                                                    {gatway.address_ip} : {gatway.address_mac} : {gatway.Gateway_manufacturer}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                    <CCol md={6} className="position-relative">
                                        <CFormSelect
                                            onChange={(e) => fetchSensors(e.target.value)}
                                            id="validationTooltip04"
                                        >
                                            <option value={""}> Please orders </option>
                                            {Listorders?.map((order, index) => (
                                                <option key={`type${index}`} value={order.gateways}>
                                                    {order.ref} : {order.note}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>

                                </CRow>
                                <CCol xs="12">

                                    <CCard className="mb-4">
                                        <CCardHeader>
                                            <CRow className="align-items-center">
                                                <CCol md="6" xs="12">
                                                    <strong>Sensors </strong>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <GenericTable columns={columns} data={Listsensors} />
                                    </CCard>
                                </CCol>


                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default DataVisualisation;
