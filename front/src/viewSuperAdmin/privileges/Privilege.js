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
    CFormInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilPlus } from '@coreui/icons';
import { settingsPrivileges } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';

const initialPrivilegeState = {
    privilege: '',
    description:'',

};


const PrivilegesC = ({ refresh, selectedPrivilege }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [Privilege, setPrivilege] = useState(initialPrivilegeState);

    useEffect(() => {
        setIsUpdateMode(!!selectedPrivilege);
        setPrivilege(selectedPrivilege || initialPrivilegeState);
    }, [selectedPrivilege]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsPrivileges.updatePrivilege(Privilege, Privilege.privilege)
            : await settingsPrivileges.addPrivilege(Privilege);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setPrivilege(initialPrivilegeState);
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

    const modalTitle = useMemo(() => (isUpdateMode ? 'Update Privilege' : 'Add Privilege'), [isUpdateMode]);

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
                            <CFormLabel htmlFor="validationTooltip03">privilege</CFormLabel>
                            <CFormInput value={Privilege.privilege} disabled={isUpdateMode} onChange={(e) => setPrivilege({ ...Privilege, privilege: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid privilege.
                            </CFormFeedback>
                        </CCol>
                      
               
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">description</CFormLabel>
                            <CFormInput value={Privilege.description} onChange={(e) => setPrivilege({ ...Privilege, description: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid description.
                            </CFormFeedback>
                        </CCol>
                       
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                Close
                            </CButton>
                            <CButton color="primary" type="submit" >Save changes</CButton>
                        </CModalFooter>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
};

PrivilegesC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedPrivilege: PropTypes.object,
};

export default PrivilegesC;
