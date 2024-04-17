import React, { useState, useEffect, useMemo } from 'react';
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
    CFormInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilPlus } from '@coreui/icons';
import { settingsOrders } from 'src/services/Settings.iot/index';
import PropTypes from 'prop-types';

const initialOrderState = {
    description: '',
    prix_unitaire: 0,
    quantite: 0,
    note: '',
    type: '',
    ref: '',
    categorie: '',
};

const OrdersC = ({ refresh, selectedOrder }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [Order, setOrder] = useState(initialOrderState);

    useEffect(() => {
        setIsUpdateMode(!!selectedOrder);
        setOrder(selectedOrder || initialOrderState);
    }, [selectedOrder]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsOrders.updateOrder(Order, selectedOrder.id)
            : await settingsOrders.addOrder(Order);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setOrder(initialOrderState);
            refresh();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {
            handleAddOrUpdate();
        }
    };

    const modalTitle = useMemo(() => (isUpdateMode ? 'Update Order' : 'Add Order'), [isUpdateMode]);

    return (
        <>
            <CButton color={isUpdateMode ? 'secondary' : 'primary'} onClick={() => setVisible(!visible)}>
                <CIcon icon={isUpdateMode ? cilPen : cilPlus} />
            </CButton>

            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
                size="xl"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                          <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="ref">ref</CFormLabel>
                            <CFormInput
                                value={Order.ref}
                                onChange={(e) => setOrder({ ...Order, ref: e.target.value })}
                                type="text"
                                id="ref"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid ref.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="prix_unitaire">prix_unitaire</CFormLabel>
                            <CFormInput
                                value={Order.prix_unitaire}
                                onChange={(e) => setOrder({ ...Order, prix_unitaire: e.target.value })}
                                type="number"
                                id="prix_unitaire"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid prix_unitaire.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="quantite">quantite</CFormLabel>
                            <CFormInput
                                value={Order.quantite}
                                onChange={(e) => setOrder({ ...Order, quantite: e.target.value })}
                                type="number"
                                id="quantite"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid quantite.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="note">note</CFormLabel>
                            <CFormInput
                                value={Order.note}
                                onChange={(e) => setOrder({ ...Order, note: e.target.value })}
                                type="text"
                                id="note"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid note.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="type">type</CFormLabel>
                            <CFormInput
                                value={Order.type}
                                onChange={(e) => setOrder({ ...Order, type: e.target.value })}
                                type="text"
                                id="type"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid type.
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="description">Description</CFormLabel>
                            <CFormInput
                                value={Order.description}
                                onChange={(e) => setOrder({ ...Order, description: e.target.value })}
                                type="text"
                                id="description"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid description.
                            </CFormFeedback>
                        </CCol>
                    
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="categorie">categorie</CFormLabel>
                            <CFormInput
                                value={Order.categorie}
                                onChange={(e) => setOrder({ ...Order, categorie: e.target.value })}
                                type="text"
                                id="categorie"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid categorie.
                            </CFormFeedback>
                        </CCol>

                 

                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip04">Type status</CFormLabel>
                            <CFormSelect
                                defaultValue={Order.status || ""}
                                onChange={(e) => setOrder({ ...Order, status: e.target.value })}
                                id="validationTooltip04"
                            >
                                <option value={Order.status || ""}>{Order.status}</option>
                                {['en cours', 'Updated', 'Error', 'Maintenance']?.map((status, index) => (
                                    <option key={`type${index}`} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </CFormSelect>

                            <CFormFeedback tooltip invalid>
                                Please choose status Admin
                            </CFormFeedback>
                        </CCol>
                        {/* Add similar form inputs for other fields */}
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
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
};

OrdersC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedOrder: PropTypes.object,
};

export default OrdersC;
