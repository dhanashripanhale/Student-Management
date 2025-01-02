import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
    Card,
    CardBody,
    Col,
    Container,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    Modal,
    ModalHeader,
    Form,
    ModalBody,
    Label,
    Input,
    FormFeedback
} from "reactstrap";
import * as moment from "moment";
import { Link } from "react-router-dom";
import Select from "react-select";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";
import { isEmpty } from "lodash";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import actions
import {
    getOrders as onGetOrders,
    addNewOrder as onAddNewOrder,
    updateOrder as onUpdateOrder,
    deleteOrder as onDeleteOrder,
} from "../../store/ecommerce/action";

import Loader from "../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ExportCSVModal from "../../Components/Common/ExportCSVModal";
import { createSelector } from "reselect";

const UnitAdd = (props) => {
    const [orderStatus, setorderStatus] = useState(null);
    const [orderPayement, setorderPayement] = useState(null);

    useEffect(() => {
        setModal(false);
        toggle();

    }, [props.modalState])




    const [modal, setModal] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    const dispatch = useDispatch();

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

    const orderstatus = [
        {
            options: [
                { label: "Status", value: "Status" },
                { label: "All", value: "All" },
                { label: "Pending", value: "Pending" },
                { label: "Inprogress", value: "Inprogress" },
                { label: "Cancelled", value: "Cancelled" },
                { label: "Pickups", value: "Pickups" },
                { label: "Returns", value: "Returns" },
                { label: "Delivered", value: "Delivered" },
            ],
        },
    ];

    const orderpayement = [
        {
            options: [
                { label: "Select Payment", value: "Select Payment" },
                { label: "All", value: "All" },
                { label: "Mastercard", value: "Mastercard" },
                { label: "Paypal", value: "Paypal" },
                { label: "Visa", value: "Visa" },
                { label: "COD", value: "COD" },
            ],
        },
    ];

    const productname = [
        {
            options: [
                { label: "Product", value: "Product" },
                { label: "Puma Tshirt", value: "Puma Tshirt" },
                { label: "Adidas Sneakers", value: "Adidas Sneakers" },
                {
                    label: "350 ml Glass Grocery Container",
                    value: "350 ml Glass Grocery Container",
                },
                {
                    label: "American egale outfitters Shirt",
                    value: "American egale outfitters Shirt",
                },
                { label: "Galaxy Watch4", value: "Galaxy Watch4" },
                { label: "Apple iPhone 12", value: "Apple iPhone 12" },
                { label: "Funky Prints T-shirt", value: "Funky Prints T-shirt" },
                {
                    label: "USB Flash Drive Personalized with 3D Print",
                    value: "USB Flash Drive Personalized with 3D Print",
                },
                {
                    label: "Oxford Button-Down Shirt",
                    value: "Oxford Button-Down Shirt",
                },
                {
                    label: "Classic Short Sleeve Shirt",
                    value: "Classic Short Sleeve Shirt",
                },
                {
                    label: "Half Sleeve T-Shirts (Blue)",
                    value: "Half Sleeve T-Shirts (Blue)",
                },
                { label: "Noise Evolve Smartwatch", value: "Noise Evolve Smartwatch" },
            ],
        },
    ];

    const [isEdit, setIsEdit] = useState(false);

    function handleorderStatus(orderStatus) {
        setorderStatus(orderStatus);
    }

    function handleorderPayement(orderPayement) {
        setorderPayement(orderPayement);
    }

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteModalMulti, setDeleteModalMulti] = useState(false);

    const onClickDelete = (order) => {
        setOrder(order);
        setDeleteModal(true);
    };

    const handleDeleteOrder = () => {
        if (order) {
            dispatch(onDeleteOrder(order._id));
            setDeleteModal(false);
        }
    };

    useEffect(() => {
        setOrderList(orders);
    }, [orders]);

    useEffect(() => {
        if (!isEmpty(orders)) setOrderList(orders);
    }, [orders]);

    const toggleTab = (tab, type) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            let filteredOrders = orders;
            if (type !== "all") {
                filteredOrders = orders.filter((order) => order.status === type);
            }
            setOrderList(filteredOrders);
        }
    };

    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            orderId: (order && order.orderId) || '',
            customer: (order && order.customer) || '',
            product: (order && order.product) || '',
            orderDate: (order && order.orderDate) || '',
            // ordertime: (order && order.ordertime) || '',
            amount: (order && order.amount) || '',
            payment: (order && order.payment) || '',
            status: (order && order.status) || '',
        },
        validationSchema: Yup.object({
            orderId: Yup.string().required("Please Enter order Id"),
            customer: Yup.string().required("Please Enter Customer Name"),
            product: Yup.string().required("Please Enter Product Name"),
            // orderDate: Yup.string().required("Please Enter Order Date"),
            // ordertime: Yup.string().required("Please Enter Order Time"),
            amount: Yup.string().required("Please Enter Total Amount"),
            payment: Yup.string().required("Please Enter Payment Method"),
            status: Yup.string().required("Please Enter Delivery Status")
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateOrder = {
                    _id: order ? order._id : 0,
                    orderId: values.orderId,
                    customer: values.customer,
                    product: values.product,
                    orderDate: date,
                    // ordertime: values.ordertime,
                    amount: values.amount,
                    payment: values.payment,
                    status: values.status
                };
                // update order
                dispatch(onUpdateOrder(updateOrder));
                validation.resetForm();
            } else {
                const newOrder = {
                    _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    orderId: values["orderId"],
                    customer: values["customer"],
                    product: values["product"],
                    orderDate: date,
                    // ordertime: values["ordertime"],
                    amount: values["amount"],
                    payment: values["payment"],
                    status: values["status"]
                };
                // save new order
                dispatch(onAddNewOrder(newOrder));
                validation.resetForm();
            }
            toggle();
        },
    });

    useEffect(() => {
        if (orders && !orders.length) {
            dispatch(onGetOrders());
        }
    }, [dispatch, orders]);

    useEffect(() => {
        setOrder(orders);
    }, [orders]);

    useEffect(() => {
        if (!isEmpty(orders)) {
            setOrder(orders);
            setIsEdit(false);
        }
    }, [orders]);


    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setOrder(null);
            props.setModalState();
        } else {
            setModal(true);
            setDate(defaultdate());
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

    // Node API 
    // useEffect(() => {
    //   if (isOrderCreated) {
    //     setOrder(null);
    //     dispatch(onGetOrders());
    //   }
    // }, [
    //   dispatch,
    //   isOrderCreated,
    // ]);

    // Checked All
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

    const deleteMultiple = () => {
        const checkall = document.getElementById("checkBoxAll");
        selectedCheckBoxDelete.forEach((element) => {
            dispatch(onDeleteOrder(element.value));
            setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
        });
        setIsMultiDeleteButton(false);
        checkall.checked = false;
    };

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
                Header: "Order Id",
                accessor: "orderId",
                filterable: false,
                Cell: (cell) => {
                    return <Link to="/apps-ecommerce-order-details" className="fw-medium link-primary">{cell.value}</Link>;
                },
            },
            {
                Header: "Customer",
                accessor: "customer",
                filterable: false,
            },
            {
                Header: "Product",
                accessor: "product",
                filterable: false,
            },
            {
                Header: "Order Date",
                accessor: "orderDate",
                Cell: (order) => (
                    <>
                        {handleValidDate(order.row.original.orderDate)},
                        <small className="text-muted"> {handleValidTime(order.row.original.orderDate)}</small>
                    </>
                ),
            },
            {
                Header: "Amount",
                accessor: "amount",
                filterable: false,
            },
            {
                Header: "Payment Method",
                accessor: "payment",
                filterable: false,
            },
            {
                Header: 'Delivery Status',
                accessor: 'status',
                Cell: (cell) => {
                    switch (cell.value) {
                        case "Pending":
                            return <span className="badge text-uppercase bg-warning-subtle text-warning"> {cell.value} </span>;
                        case "Cancelled":
                            return <span className="badge text-uppercase bg-danger-subtle text-danger"> {cell.value} </span>;
                        case "Inprogress":
                            return <span className="badge text-uppercase bg-secondary-subtle text-secondary"> {cell.value} </span>;
                        case "Pickups":
                            return <span className="badge text-uppercase bg-info-subtle text-info"> {cell.value} </span>;
                        case "Returns":
                            return <span className="badge text-uppercase bg-primary-subtle text-primary"> {cell.value} </span>;
                        case "Delivered":
                            return <span className="badge text-uppercase bg-success-subtle text-success"> {cell.value} </span>;
                        default:
                            return <span className="badge text-uppercase bg-warning-subtle text-warning"> {cell.value} </span>;
                    }
                }
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
                                <Link
                                    to="#"
                                    className="text-primary d-inline-block edit-item-btn"
                                    onClick={() => {
                                        const orderData = cellProps.row.original;
                                        handleOrderClick(orderData);
                                    }}
                                >
                                    <i className="ri-pencil-fill fs-16"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link
                                    to="#"
                                    className="text-danger d-inline-block remove-item-btn"
                                    onClick={() => {
                                        const orderData = cellProps.row.original;
                                        onClickDelete(orderData);
                                    }}
                                >
                                    <i className="ri-delete-bin-5-fill fs-16"></i>
                                </Link>
                            </li>
                        </ul>
                    );
                },
            },
        ],
        [handleOrderClick, checkedAll]
    );

    const defaultdate = () => {
        let d = new Date(),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let h = (d.getHours() % 12) || 12;
        let ampm = d.getHours() < 12 ? "AM" : "PM";
        return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear() + ", " + h + ":" + d.getMinutes() + " " + ampm).toString());
    };


    const [date, setDate] = useState(defaultdate());

    const dateformate = (e) => {
        const dateString = e.toString().split(" ");

        let time = dateString[4];
        let H = +time.substr(0, 2);
        let h = (H % 12) || 12;
        h = (h <= 9) ? h = ("0" + h) : h;
        let ampm = H < 12 ? "AM" : "PM";
        time = h + time.substr(2, 3) + " " + ampm;

        const date = dateString[2] + " " + dateString[1] + ", " + dateString[3];
        const orderDate = (date + ", " + time).toString();
        setDate(orderDate);

    };

    const handleValidDate = date => {
        const date1 = moment(new Date(date)).format("DD MMM Y");
        return date1;
    };

    const handleValidTime = (time) => {
        const time1 = new Date(time);
        const getHour = time1.getUTCHours();
        const getMin = time1.getUTCMinutes();
        const getTime = `${getHour}:${getMin}`;
        var meridiem = "";
        if (getHour >= 12) {
            meridiem = "PM";
        } else {
            meridiem = "AM";
        }
        const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
        return updateTime;
    };

    const [isExportCSV, setIsExportCSV] = useState(false);

    document.title = "Orders | Velzon - React Admin & Dashboard Template";

    return (
        <div className="page-content">
            <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                <ModalHeader className="bg-light p-3" toggle={toggle}>
                    Create Unit
                </ModalHeader>
                <Form className="tablelist-form" >
                    <ModalBody>
                        <div className="mb-3">
                            <Label
                                htmlFor="categoryname-field"
                                className="form-label"
                            >
                                Unit Name
                            </Label>
                            <Input
                                name="category"
                                id="category-field"
                                className="form-control"
                                placeholder="Unit Name"
                                type="text"
                            />
                        </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                            <button type="submit" className="btn btn-success">
                                Add Unit
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default UnitAdd;
