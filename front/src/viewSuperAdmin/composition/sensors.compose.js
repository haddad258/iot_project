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
import { settingsSensors,settingsGateways } from 'src/services/Settings.iot/index';
// import { settingsProducts } from 'src/services';
function SensorCompose({selectedGW,refresh}) {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const initialGatewayState = selectedGW || {};
    const [Gateway, setGateways] = useState(initialGatewayState);
    const [sensors, setsensors] = useState([]);
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
    const OpenModalProduct = async () => {
        setVisible(true);
        fetchSensors();
        setGateways(initialGatewayState)
    };

    const handleAdd = () => {
        setsensors([...sensors, {}]); // Add a new empty sensors object
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity()) {
            var list = await settingsGateways.updateGatewayCompose({ sensors: sensors.map(e=>e.id)  ,Gateway: Gateway.id},Gateway.id)
          
            if (list) {
                setVisible(false);
                setValidated(false); //
                setsensors([]); //
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
                    <CModalTitle id="LiveDemoExampleLabel">Add Products for  Gateways</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >

                        { }
                        {sensors.map((pack, index) => (
                            <>


                                <CCol md={12} className="position-relative">
                                    <CFormLabel htmlFor="validationTooltip04">Type status</CFormLabel>
                                    <CFormSelect
                                        defaultValue={Gateway.status || ""}
                                        onChange={(e) => {

                                            const new_sensors = [...sensors];
                                            new_sensors[index].id = e.target.value;
                                            setsensors(new_sensors);
                                        }}
                                        id="validationTooltip04"
                                        required
                                    >
                                        <option value={Gateway.status || ""}>{Gateway.status}</option>
                                        {List.map((senor, index) => (
                                            <option key={`type${index}`} value={senor.id}>
                                                {senor.name}
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

SensorCompose.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedGW: PropTypes.object,
};

export default SensorCompose;
