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


const CategoryAdd = (props) => {

    const [categoryName,setCategoryName]=useState("");
    const [categoryBannerImage,setCategoryBannerImage]=useState("");
    const [categoryImage,setCategoryImage]=useState("");
    const [editData,setEditData]=useState(true);
 
    useEffect(() => {
        setModal(false);
        toggle();
    }, [props.modalState])

    console.log(props.data);

    useEffect(()=>{
        if(props.data != false)
        {
            setEditData(false)
          
        }else{
            setCategoryName(props.data?.categoryName);
            setCategoryBannerImage(props.data?.categoryImage);
            setCategoryImage(props.data?.categoryBannerImage);
        }
    },[]);



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
                                value={categoryName}
                                id="category-field"
                                className="form-control"
                                placeholder="Category Name"
                                type="text"
                            />
                        </div>
                        {
                            editData?<div className="mb-3">
                         
                            <Label
                                htmlFor="categoryimage-field"
                                className="form-label"
                            >
                                Previous Category Image
                            </Label><br/>
                            
                            <img src={props.data?.categoryImage} width={150} height={100}></img>

                        </div>:""
                        }

                        <div className="mb-3">
                            <Label
                                htmlFor="categoryimage-field"
                                className="form-label"
                            >
                                { editData?"Select New Category Image": "Category Image"}
                               
                            </Label>
                            <Input className="form-control" id="formSizeDefault" type="file" />

                        </div>

                        {
                            editData?<div className="mb-3">
                         
                            <Label
                                htmlFor="categoryimage-field"
                                className="form-label"
                            >
                                Previous Category Banner
                            </Label><br/>
                            
                            <img src={props.data?.categoryImage} width={150} height={100}></img>

                        </div>:""
                        }

                        <div className="mb-3">
                            <Label
                                htmlFor="categoryimage-field"
                                className="form-label"
                            >
                                { editData?"Select New Category Banner": "Category Image"}
                               
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

export default CategoryAdd;
