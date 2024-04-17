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
import { cilCircle } from '@coreui/icons';
import { settingsOrders } from 'src/services/Settings.iot/index';
import GenericTable from 'src/components/Generic.Table';
// import { settingsProducts } from 'src/services';
function ViewOrdersAssign({ selectedGateway }) {
    const [visible, setVisible] = useState(false);
    const [List, setList] = useState([]);


    const fetchOrders = async () => {
        try {
            const list = await settingsOrders.getOrderAssign(selectedGateway.id);
            if (list) {
                setList(list?.data?.orders);
                console.log(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    const OpenModalProduct = async () => {
        setVisible(true);
        fetchOrders();
    };


    const columns = [
        { label: '#', field: 'index' },
        { label: 'ref', field: 'ref' },
        { label: 'type', field: 'type' },
        { label: 'status', field: 'status', },
        {
            label: 'categorie', field: 'categorie',
            render: (item) => `${item.prix_unitaire}-${item.quantite} (${item.categorie})`
        },
        { label: 'description', field: 'description' },

    ];

    return (
        <>
            <CButton color="warning" onClick={() => OpenModalProduct()}>
                <CIcon icon={cilCircle} />
            </CButton>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
                size="xl"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel"> {selectedGateway.address_mac} :List Orders   Gateways </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <CRow className="align-items-center">
                                <CCol md="6" xs="12">
                                    <strong>Orders </strong>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol xs="12">
                                    <CCard className="mb-4">
                                        <CCardHeader>
                                            <strong>Settings Orders</strong>
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

ViewOrdersAssign.propTypes = {
    selectedGateway: PropTypes.object,
};

export default ViewOrdersAssign;
