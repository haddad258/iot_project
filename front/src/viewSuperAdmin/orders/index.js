import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsOrders } from 'src/services/Settings.iot/index';
import GenericTable from 'src/components/Generic.Table';
import OrdersC from './Order'
const Orders = () => {
    const [List, setList] = useState([]);

    const fetchOrders = async () => {
        try {
            const list = await settingsOrders.getOrder();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    const columns = [
        { label: '#', field: 'index' },
        { label: 'ref', field: 'ref' },
        { label: 'type', field: 'type' },
        { label: 'status', field: 'status' ,},
        { label: 'categorie', field: 'categorie' ,
        render: (item) => `${item.prix_unitaire}-${item.quantite} (${item.categorie})`
    },
        { label: 'description', field: 'description'},
        {
            label: 'Actions',
            field: 'actions',
            render: (item) => 
           ( 
           <>
            <OrdersC refresh={()=>fetchOrders()} selectedOrder={item} />
            </>
            )
            ,
        },
    ];

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>Orders </strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                        <OrdersC refresh={()=>fetchOrders()} />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Settings Orders</strong>
                            </CCardHeader>
                            <CCardBody>
                                    <GenericTable columns={columns} data={List} />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default Orders;
