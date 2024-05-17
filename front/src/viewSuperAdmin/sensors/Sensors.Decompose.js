import React, { useState, useEffect, useMemo } from 'react';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCheck,  cilScrubber } from '@coreui/icons';
import { settingsSensors } from 'src/services/Settings.iot/index';
import PropTypes from 'prop-types';

const initialSensorState = {
  
};

const SensorsDecompose = ({ refresh, selectedSensor }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [sensor, setSensor] = useState(initialSensorState);

    useEffect(() => {
        setIsUpdateMode(!!(selectedSensor.gateways));
        setSensor(selectedSensor || initialSensorState);
    }, [selectedSensor]);

    const handleAddOrUpdate = async () => {
        const result = await settingsSensors.updateSensor({"gateways":null,id:selectedSensor.id}, selectedSensor.id)
            
         console.log(sensor)
        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setSensor(initialSensorState);
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

    const modalTitle = useMemo(() => (isUpdateMode ? 'Update sensor decompose' : 'Update sensor decompose'), [isUpdateMode]);

    return (
        <>
            <CButton color={isUpdateMode ? 'danger' : 'success'} onClick={() => setVisible(!visible)}>
                <CIcon icon={isUpdateMode ? cilCheck : cilScrubber} />
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

SensorsDecompose.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedSensor: PropTypes.object,
};

export default SensorsDecompose;
