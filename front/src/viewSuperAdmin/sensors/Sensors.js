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
import { settingsSensors } from 'src/services/Settings.iot/index';
import PropTypes from 'prop-types';

const initialSensorState = {
    description: '',
    name: '',
    address_ip: '',
    address_mac: '',
    model: '',
    type: '',
    measurement_unit: '',
    Thresholds_min: 0,
    Thresholds_max: 0,
    sensor_manufacturer: '',
    installation_date: '',
    last_maintenance_date: '',
    status: 'Inactive',
};

const SensorsC = ({ refresh, selectedSensor }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [sensor, setSensor] = useState(initialSensorState);

    useEffect(() => {
        setIsUpdateMode(!!selectedSensor);
        setSensor(selectedSensor || initialSensorState);
    }, [selectedSensor]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsSensors.updateSensor(sensor, selectedSensor.id)
            : await settingsSensors.addSensor(sensor);

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

    const modalTitle = useMemo(() => (isUpdateMode ? 'Update Sensor' : 'Add Sensor'), [isUpdateMode]);

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
                                value={sensor.name}
                                onChange={(e) => setSensor({ ...sensor, name: e.target.value })}
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
                                value={sensor.address_ip}
                                onChange={(e) => setSensor({ ...sensor, address_ip: e.target.value })}
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
                                value={sensor.address_mac}
                                onChange={(e) => setSensor({ ...sensor, address_mac: e.target.value })}
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
                                value={sensor.location}
                                onChange={(e) => setSensor({ ...sensor, location: e.target.value })}
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
                                value={sensor.model}
                                onChange={(e) => setSensor({ ...sensor, model: e.target.value })}
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
                                value={sensor.type}
                                onChange={(e) => setSensor({ ...sensor, type: e.target.value })}
                                type="text"
                                id="type"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid type.
                            </CFormFeedback>
                        </CCol>


                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="measurement_unit">measurement_unit</CFormLabel>
                            <CFormInput
                                value={sensor.measurement_unit}
                                onChange={(e) => setSensor({ ...sensor, measurement_unit: e.target.value })}
                                type="text"
                                id="measurement_unit"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid measurement_unit.
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="Thresholds_min">Thresholds_min</CFormLabel>
                            <CFormInput
                                value={sensor.Thresholds_min}
                                onChange={(e) => setSensor({ ...sensor, Thresholds_min: e.target.value })}
                                type="number"
                                id="Thresholds_min"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid Thresholds_min.
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="Thresholds_max">Thresholds_max</CFormLabel>
                            <CFormInput
                                value={sensor.Thresholds_max}
                                onChange={(e) => setSensor({ ...sensor, Thresholds_max: e.target.value })}
                                type="number"
                                id="Thresholds_max"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid Thresholds_max.
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="description">Description</CFormLabel>
                            <CFormInput
                                value={sensor.description}
                                onChange={(e) => setSensor({ ...sensor, description: e.target.value })}
                                type="text"
                                id="description"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid description.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="sensor_manufacturer">sensor_manufacturer</CFormLabel>
                            <CFormInput
                                value={sensor.sensor_manufacturer}
                                onChange={(e) => setSensor({ ...sensor, sensor_manufacturer: e.target.value })}
                                type="text"
                                id="sensor_manufacturer"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid sensor_manufacturer.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="installation_date">installation_date</CFormLabel>
                            <CFormInput
                                value={sensor.installation_date}
                                onChange={(e) => setSensor({ ...sensor, installation_date: e.target.value })}
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
                                value={sensor.last_maintenance_date}
                                onChange={(e) => setSensor({ ...sensor, last_maintenance_date: e.target.value })}
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
                                defaultValue={sensor.status || ""}
                                onChange={(e) => setSensor({ ...sensor, status: e.target.value })}
                                id="validationTooltip04"
                                required
                            >
                                <option value={sensor.status || ""}>{sensor.status}</option>
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

SensorsC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedSensor: PropTypes.object,
};

export default SensorsC;
