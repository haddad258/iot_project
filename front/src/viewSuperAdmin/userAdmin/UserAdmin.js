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
    CFormSelect
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilPlus } from '@coreui/icons';
import { settingsUserAdmins, settingsPrivileges } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import moment from 'moment';
import PrivilegesC from '../privileges/Privilege'
const initialUserAdminState = {
    name: '',
    lastname: '',
    functions: '',
    username: '',
    email: '',
    phone_number: '',
    birthdate: ''

};


const UserAdminsC = ({ refresh, selectedUserAdmin }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [List, setList] = useState([]);

    const [UserAdmin, setUserAdmin] = useState(initialUserAdminState);

    useEffect(() => {
        setIsUpdateMode(!!selectedUserAdmin);
        setUserAdmin(selectedUserAdmin || initialUserAdminState);
    }, [selectedUserAdmin]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsUserAdmins.updateUsersAdmin(UserAdmin, UserAdmin.id)
            : await settingsUserAdmins.addUsersAdmin(UserAdmin);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
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
    const createNewAdmin = async () => {
        fetchPrivileges();
        setVisible(!visible)

    };
    const fetchPrivileges = async () => {
        try {
            const list = await settingsPrivileges.getPrivilege();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    const modalTitle = useMemo(() => (isUpdateMode ? 'Update UserAdmin' : 'Add UserAdmin'), [isUpdateMode]);

    return (
        <>
            <CButton color={isUpdateMode ? 'secondary' : 'primary'} onClick={() => createNewAdmin()}>
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
                    {new moment(UserAdmin.birthdate).format("yyyy-MM-DD")}
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip01">Name</CFormLabel>
                            <CFormInput value={UserAdmin.name} onChange={(e) => setUserAdmin({ ...UserAdmin, name: e.target.value })} type="text" id="validationTooltip01" required />
                            <CFormFeedback tooltip invalid>
                                required
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">lastname</CFormLabel>
                            <CFormInput value={UserAdmin.lastname} onChange={(e) => setUserAdmin({ ...UserAdmin, lastname: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid lastname.
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">username</CFormLabel>
                            <CFormInput value={UserAdmin.username} onChange={(e) => setUserAdmin({ ...UserAdmin, username: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid username.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">email</CFormLabel>
                            <CFormInput value={UserAdmin.email} onChange={(e) => setUserAdmin({ ...UserAdmin, email: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid email.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">phone_number</CFormLabel>
                            <CFormInput value={UserAdmin.phone_number} onChange={(e) => setUserAdmin({ ...UserAdmin, phone_number: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid phone_number.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">birthdate</CFormLabel>
                            <CFormInput defaultValue={UserAdmin.birthdate} value={UserAdmin.birthdate} onChange={(e) => setUserAdmin({ ...UserAdmin, birthdate: e.target.value })} type="date" required />
                            {/* <CDatePicker date={UserAdmin.birthdate} onChange={(e) => setUserAdmin({ ...UserAdmin, birthdate: e.target.value })}  label="Date" locale="en-US" /> */}
                            <CFormFeedback tooltip invalid>
                                Please provide a valid birthdate.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">functions</CFormLabel>
                            <CFormInput value={UserAdmin.functions} onChange={(e) => setUserAdmin({ ...UserAdmin, functions: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid functions.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">description</CFormLabel>
                            <CFormInput value={UserAdmin.description} onChange={(e) => setUserAdmin({ ...UserAdmin, description: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                Please provide a valid description.
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip04">Type privilege</CFormLabel>
                            <CFormSelect
                                defaultValue={UserAdmin.privilege || ""}
                                onChange={(e) => setUserAdmin({ ...UserAdmin, privilege: e.target.value })}
                                id="validationTooltip04"
                                required
                            >
                                <option value={UserAdmin.privilege || ""}>{UserAdmin.privilege}</option>
                                {List?.map((privilege, index) => (
                                    <option key={`type${index}`} value={privilege.privilege}>
                                        {privilege.privilege} : {privilege.description}
                                    </option>
                                ))}
                            </CFormSelect>
                            <PrivilegesC refresh={() => fetchPrivileges()} />

                            <CFormFeedback tooltip invalid>
                                Please choose privilege Admin
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

UserAdminsC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedUserAdmin: PropTypes.object,
};

export default UserAdminsC;
