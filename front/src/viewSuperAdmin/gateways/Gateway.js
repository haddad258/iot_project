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
import { settingsGateways } from 'src/services/Settings.iot/index';
import PropTypes from 'prop-types';

const initialGatewayState = {
    description: '',
    name: '',
    address_ip: '',
    address_mac: '',
    model: '',
    type: '',
    Gateway_manufacturer: '',
    installation_date: '',
    last_maintenance_date: '',
    status: 'Inactive',
};

const GatewaysC = ({ refresh, selectedGateway }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [Gateway, setGateway] = useState(initialGatewayState);

    useEffect(() => {
        setIsUpdateMode(!!selectedGateway);
        setGateway(selectedGateway || initialGatewayState);
    }, [selectedGateway]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsGateways.updateGateway(Gateway, selectedGateway.id)
            : await settingsGateways.addGateway(Gateway);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setGateway(initialGatewayState);
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

    const modalTitle = useMemo(() => (isUpdateMode ? 'Update Gateway' : 'Add Gateway'), [isUpdateMode]);

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
                            <CFormLabel htmlFor="name">name</CFormLabel>
                            <CFormInput
                                value={Gateway.name}
                                onChange={(e) => setGateway({ ...Gateway, name: e.target.value })}
                                type="text"
                                id="name"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid name.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="address_ip">address_ip</CFormLabel>
                            <CFormInput
                                value={Gateway.address_ip}
                                onChange={(e) => setGateway({ ...Gateway, address_ip: e.target.value })}
                                type="text"
                                id="address_ip"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid address_ip.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="address_mac">address_mac</CFormLabel>
                            <CFormInput
                                value={Gateway.address_mac}
                                onChange={(e) => setGateway({ ...Gateway, address_mac: e.target.value })}
                                type="text"
                                id="address_mac"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid address_mac.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="location">location</CFormLabel>
                            <CFormInput
                                value={Gateway.location}
                                onChange={(e) => setGateway({ ...Gateway, location: e.target.value })}
                                type="text"
                                id="location"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid location.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="model">model</CFormLabel>
                            <CFormInput
                                value={Gateway.model}
                                onChange={(e) => setGateway({ ...Gateway, model: e.target.value })}
                                type="text"
                                id="model"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid model.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="type">type</CFormLabel>
                            <CFormInput
                                value={Gateway.type}
                                onChange={(e) => setGateway({ ...Gateway, type: e.target.value })}
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
                                value={Gateway.description}
                                onChange={(e) => setGateway({ ...Gateway, description: e.target.value })}
                                type="text"
                                id="description"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid description.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="Gateway_manufacturer">Gateway_manufacturer</CFormLabel>
                            <CFormInput
                                value={Gateway.Gateway_manufacturer}
                                onChange={(e) => setGateway({ ...Gateway, Gateway_manufacturer: e.target.value })}
                                type="text"
                                id="Gateway_manufacturer"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid Gateway_manufacturer.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="installation_date">installation_date</CFormLabel>
                            <CFormInput
                                value={Gateway.installation_date}
                                onChange={(e) => setGateway({ ...Gateway, installation_date: e.target.value })}
                                type="text"
                                id="installation_date"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid installation_date.
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="last_maintenance_date">last_maintenance_date</CFormLabel>
                            <CFormInput
                                value={Gateway.last_maintenance_date}
                                onChange={(e) => setGateway({ ...Gateway, last_maintenance_date: e.target.value })}
                                type="text"
                                id="last_maintenance_date"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid last_maintenance_date.
                            </CFormFeedback>
                        </CCol>

                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip04">Type status</CFormLabel>
                            <CFormSelect
                                defaultValue={Gateway.status || ""}
                                onChange={(e) => setGateway({ ...Gateway, status: e.target.value })}
                                id="validationTooltip04"
                                required
                            >
                                <option value={Gateway.status || ""}>{Gateway.status}</option>
                                {['Active', 'Inactive', 'Error', 'Maintenance']?.map((status, index) => (
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

GatewaysC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedGateway: PropTypes.object,
};

export default GatewaysC;
