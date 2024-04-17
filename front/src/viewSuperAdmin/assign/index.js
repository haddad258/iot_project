import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CFormSelect
} from '@coreui/react';
import { settingsGateways } from 'src/services/Settings.iot/index';
import i18n from 'src/i18n';
import { renderInformations } from 'src/components/IOT/renderInformations';
import OrdersAssign from './order.assign'
const AssignGW = () => {
    const [List, setList] = useState([]);
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
    useEffect(() => {
        fetchGateways();
    }, []);
    const ChooseGW = async (value) => {
        try {
            const selected = List.filter(e => e.id === value)
            setselectedGW(selected[0])
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>Gateways compositions </strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                    { selectedGW.id &&   
                        <OrdersAssign selectedGW={selectedGW} refresh={()=>fetchGateways()} />
                    }
                    </CCol>
                    
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Settings Gateways compositions</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CCol md={6} className="position-relative">
                                    {renderInformations(i18n.t('address_ip'), selectedGW?.address_ip)}
                                    {renderInformations(i18n.t('address_mac'), selectedGW?.address_mac)}
                                    {renderInformations(i18n.t('description'), selectedGW?.description)}
                                    {renderInformations(i18n.t('name'), selectedGW?.name)}
                                </CCol>
                                <CCol md={12} className="position-relative">
                                    <CFormSelect
                                        onChange={(e) => ChooseGW(e.target.value)}
                                        id="validationTooltip04"
                                    >
                                        <option value={""}> Please choose Gateways</option>
                                        {List?.map((gatway, index) => (
                                            <option key={`type${index}`} value={gatway.id}>
                                                {gatway.address_ip} : {gatway.address_mac}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </CCol>



                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default AssignGW;
