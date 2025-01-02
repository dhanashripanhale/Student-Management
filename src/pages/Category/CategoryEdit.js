import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
    Modal,
    ModalHeader,
    Form,
    ModalBody,
    Label,
    Input,
} from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';


const CategoryEdit = (props) => {
 
    useEffect(() => {
        setModal(false);
        toggle();

    }, [props.modalState])

    const [modal, setModal] = useState(false);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            props.setModalState();
        } else {
            setModal(true);
        }
    }, [modal]);

    return (
        <div className="page-content">
            <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                <ModalHeader className="bg-light p-3" toggle={toggle}>
                    Create Categories
                </ModalHeader>
                <Form className="tablelist-form" >
                    <ModalBody>
                        <div className="mb-3">
                            <Label
                                htmlFor="categoryname-field"
                                className="form-label"
                            >
                                Category Name
                            </Label>
                            <Input
                                name="category"
                                id="category-field"
                                className="form-control"
                                placeholder="Category Name"
                                type="text"
                            />
                        </div>

                        <div className="mb-3">
                            <Label
                                htmlFor="categoryimage-field"
                                className="form-label"
                            >
                                Category Image
                            </Label>
                            <Input className="form-control" id="formSizeDefault" type="file" />

                        </div>

                        <div className="mb-3">
                            <Label
                                htmlFor="categorybanner-field"
                                className="form-label"
                            >
                                Category Banner
                            </Label>

                            <Input className="form-control" id="formSizeDefault" type="file" />


                        </div>

                    </ModalBody>
                    <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                            <button type="submit" className="btn btn-success">
                                Add Category
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryEdit;
