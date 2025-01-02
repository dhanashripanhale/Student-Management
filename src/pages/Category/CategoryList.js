import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { isEmpty } from "lodash";
import CategoryAdd from "./CategoryAdd"
//redux
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSelector } from "reselect";

const data={
    categoryName:"productName",
    categoryImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXFjJ6gEjXYU5U5QfSw2fYZXl68YMf7b6FQ",
    categoryBannerImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXFjJ6gEjXYU5U5QfSw2fYZXl68YMf7b6FQ"
}


const CategoryList = () => {
  const [modalState,setModalState]=useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const [editData,setEditData]=useState(false);

  const selectLayoutState = (state) => state.Ecommerce;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (ecom) => ({
      orders: ecom.orders,
      isOrderSuccess: ecom.isOrderSuccess,
      error: ecom.error,
    })
  );
  // Inside your component
  const {
    orders, isOrderSuccess, error
  } = useSelector(selectLayoutProperties)


  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState([]);

  const [isEdit, setIsEdit] = useState(false);


  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  useEffect(() => {
    if (!isEmpty(orders)) setOrderList(orders);
  }, [orders]);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleOrderClicks = () => {
    setOrder("");
    setIsEdit(false);
    toggle();
  };

  const handleOrderClick = useCallback((arg) => {
    const order = arg;
    setOrder({
      _id: order._id,
      orderId: order.orderId,
      customer: order.customer,
      product: order.product,
      orderDate: order.orderDate,
      ordertime: order.ordertime,
      amount: order.amount,
      payment: order.payment,
      status: order.status
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);

 
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".orderCheckBox");
    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);



  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".orderCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };



  // Column
  const columns = useMemo(
    () => [
      {
        Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        Cell: (cellProps) => {
          return <input type="checkbox" className="orderCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
      },
      {
        Header: "Sr No",
        accessor: "orderId",
        filterable: false,
        Cell: (cell) => {
          return <Link to="/apps-ecommerce-order-details" className="fw-medium link-primary">{cell.value}</Link>;
        },
      },
   
      {
        Header: "Category Name",
        accessor: "product",
        filterable: false,
      },
     
      {
        Header: "Add Subcategory",
        accessor: "amount",
        filterable: false,
      },
   
     

      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Link
                  to="apps-ecommerce-order-details"
                  className="text-primary d-inline-block"
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item edit">
                <button
                  className="text-primary d-inline-block edit-item-btn border-0 bg-transparent"
                  onClick={()=>setModalState(!modalState)}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </button>
              </li>
              <li className="list-inline-item">
                <button
                  to="#"
                  className="text-danger d-inline-block remove-item-btn  border-0 bg-transparent"
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </button>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleOrderClick, checkedAll]
  );

 
 

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Orders" pageTitle="Ecommerce" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Order History</h5>
                  </div>
                  <div className="col-sm-auto">
                    <div className="d-flex gap-1 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={()=>setModalState(!modalState)}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Create
                        Order
                      </button>{" "}

                      {isMultiDeleteButton && <button className="btn btn-soft-danger"
                        onClick={() => setDeleteModalMulti(true)}
                      ><i
                        className="ri-delete-bin-2-line"></i></button>}
                    </div>
                  </div>
                </Row>
              </CardHeader>

              <CardBody className="pt-0">
                <div>
                  
                  {isOrderSuccess && orderList.length ? (
                    <TableContainer
                      columns={columns}
                      data={(orderList || [])}
                      isAddUserList={false}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap"
                      theadClass="table-light text-muted text-uppercase"
                      handleOrderClick={handleOrderClicks}
                      isOrderFilter={true}
                    />
                  ) : (<Loader error={error} />)
                  }
                </div>

                {
                   modalState === true ? <CategoryAdd modalState={modalState} setModalState={()=>{setModalState(false)}} data={editData}/>:""
                }
               
                <ToastContainer closeButton={false} limit={1} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryList;


