import React, { useState } from 'react';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CCol,
    CFormLabel,
    CFormFeedback,
    CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import { cilAlignLeft, cilPlus } from '@coreui/icons';
import { settingsOrders,settingsGateways } from 'src/services/Settings.iot/index';
// import { settingsProducts } from 'src/services';
function OrdersAssign({selectedGW,refresh}) {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const initialGatewayState = selectedGW || {};
    const [Gateway, setGateways] = useState(initialGatewayState);
    const [orders, setorders] = useState([]);
    const [List, setList] = useState([]);


    const fetchOrders = async () => {
        try {
            const list = await settingsOrders.getOrder();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    const OpenModalProduct = async () => {
        setVisible(true);
        fetchOrders();
        setGateways(initialGatewayState)
    };

    const handleAdd = () => {
        setorders([...orders, {}]); // Add a new empty orders object
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity()) {
            var list = await settingsGateways.updateGatewayAssign({ orders: orders.map(e=>e.id)  ,Gateway: Gateway.id},Gateway.id)
          
            if (list) {
                setVisible(false);
                setValidated(false); //
                setorders([]); //
                refresh()

            }
        }
    };

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
                    <CModalTitle id="LiveDemoExampleLabel">Add orders for  Gateways</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >

                        { }
                        {orders.map((pack, index) => (
                            <>


                                <CCol md={12} className="position-relative">
                                    <CFormLabel htmlFor="validationTooltip04">Select orders</CFormLabel>
                                    <CFormSelect
                                        defaultValue={Gateway.status || ""}
                                        onChange={(e) => {

                                            const new_orders = [...orders];
                                            new_orders[index].id = e.target.value;
                                            setorders(new_orders);
                                        }}
                                        id="validationTooltip04"
                                        required
                                    >
                                        <option value={Gateway.status || ""}>select orders</option>
                                        {List.map((senor, index) => (
                                            <option key={`type${index}`} value={senor.id}>
                                                {senor.ref}
                                            </option>
                                        ))}
                                    </CFormSelect>

                                    <CFormFeedback tooltip invalid>
                                        Please choose status 
                                    </CFormFeedback>
                                </CCol>
                            </>
                        ))}

                        <CCol md={2} className="position-relative">
                            <CButton color="success" onClick={handleAdd}>
                                <CIcon icon={cilPlus} />
                            </CButton>
                        </CCol>

                        <CModalFooter>
                            <CButton color="secondary" onClick={() => { setVisible(false) }}>
                                Close
                            </CButton>
                            <CButton color="primary" type="submit">
                                Save changes
                            </CButton>
                        </CModalFooter>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
}

OrdersAssign.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedGW: PropTypes.object,
};

export default OrdersAssign;
