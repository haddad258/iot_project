import React, { useState, useEffect } from 'react';
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
import { cilLockLocked } from '@coreui/icons';
import { settingsUserAdmins } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';

const initialUserAdminState = {
    password: '',

};


const PasswordAdmin = ({ refresh, selectedUserAdmin }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);

    const [UserAdmin, setUserAdmin] = useState(initialUserAdminState);

    useEffect(() => {
        setUserAdmin(initialUserAdminState);
    }, [selectedUserAdmin]);

    const handleAddOrUpdate = async () => {
        const result = await settingsUserAdmins.updateUsersAdminPassword({password:UserAdmin.password}, selectedUserAdmin.id)

        if (result) {
            setVisible(false);
            setValidated(false);
            setUserAdmin(initialUserAdminState);
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


    return (
        <>
            <CButton color={'warning'} onClick={() => setVisible(!visible)}>
                <CIcon icon={cilLockLocked} />
            </CButton>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
                size="xl"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel"> Update cridentials</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip01">password</CFormLabel>
                            <CFormInput value={UserAdmin.password} onChange={(e) => setUserAdmin({ ...UserAdmin, password: e.target.value })} type="password" id="validationTooltip01" defaultValue="" required />
                            <CFormFeedback tooltip invalid>
                                required
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip01">confirm password</CFormLabel>
                            <CFormInput value={UserAdmin.password} onChange={(e) => setUserAdmin({ ...UserAdmin, password: e.target.value })} type="password" id="validationTooltip01" defaultValue="" required />
                            <CFormFeedback tooltip invalid>
                                required
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

PasswordAdmin.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedUserAdmin: PropTypes.object,
};

export default PasswordAdmin;
