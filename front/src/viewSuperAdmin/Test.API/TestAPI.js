
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
import { settingsTestAPIs } from 'src/services/Settings.iot/index';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialTestAPIstate = {
    description: '',
    title: ''

};


const TestAPIsC = ({ refresh, selectedTestAPIs }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [TestAPI, setSkill] = useState(initialTestAPIstate);

    useEffect(() => {
        setIsUpdateMode(!!selectedTestAPIs);
        setSkill(selectedTestAPIs || initialTestAPIstate);
    }, [selectedTestAPIs]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsTestAPIs.updateTestAPI(TestAPI, TestAPI.id)
            : await settingsTestAPIs.addTestAPI(TestAPI);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setSkill(initialTestAPIstate);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updateTestAPITitle') : i18n.t('addTestAPITitle')), [isUpdateMode]);

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
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip01">{i18n.t('nameInputLabel')}</CFormLabel>
                            <CFormInput value={TestAPI.name} onChange={(e) => setSkill({ ...TestAPI, name: true})} type="text" id="validationTooltip01" defaultValue="" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredNameField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('descriptionInputLabel')}</CFormLabel>
                            <CFormInput value={TestAPI.description} onChange={(e) => setSkill({ ...TestAPI, description: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredDescriptionField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('titleInputLabel')}</CFormLabel>
                            <CFormInput value={TestAPI.title} onChange={(e) => setSkill({ ...TestAPI, title: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredtitleField')}
                            </CFormFeedback>
                        </CCol>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                            {i18n.t('closeButton')}
                            </CButton>
                            <CButton color="primary" type="submit" >{i18n.t('saveButton')}</CButton>
                        </CModalFooter>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
};

TestAPIsC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedTestAPIs: PropTypes.object,
};

export default TestAPIsC;

