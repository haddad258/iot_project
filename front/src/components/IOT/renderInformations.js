import React from 'react';
import {  CCol } from '@coreui/react';
import i18n from 'src/i18n';

export const renderInformations = (label, value) => (
  <>
      <CCol md={12} className="position-relative">
        <strong>{i18n.t(label)}</strong>
      </CCol>
      <CCol md={12} className="position-relative">
        {value}
      </CCol>
  </>
);
