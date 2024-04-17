import React, { useState, useMemo } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types';
import { cilCheckCircle, cilXCircle } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { commonSettings } from 'src/services/common.settings';

const StatusRow = ({ status, data, id, refresh }) => {
  const [visible, setVisible] = useState(false)
  const formattedData = useMemo(() => {
    return "message active and desactive using i18n " + data// Example formatting
  }, [data])

  const handleSubmit = async () => {
    var newstatus = status ? 0 : 1;
    const result = await commonSettings.updateTableStatus({
      status: newstatus,
      data: data,
      id: id
    })

    if (result) {
      setVisible(false);
      refresh();
    }
  };

  return (
    <>
      <CButton color={status?"success":"danger"} onClick={() => setVisible(!visible)}>
          <CIcon icon={status ? cilCheckCircle : cilXCircle} />
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>active/desactive {data}</CModalTitle>
        </CModalHeader>
        <CModalBody>

          <p>{formattedData} </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton onClick={() => handleSubmit()} color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
StatusRow.propTypes = {
  refresh: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
  id: PropTypes.object,
  status: PropTypes.object,
};
export default StatusRow
