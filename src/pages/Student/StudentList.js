
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Container,
  Row,
  Col,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { FaPen, FaTrash } from "react-icons/fa";
import StudentAdd from "./StudentAdd";
// import ImageModal from "./ImageModal";

const StudentList = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [upadteData, setUpdateData] = useState({});
  const [Pages, SetPages] = useState(1);
  const [Count, setCount] = useState(0);

 
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };
  const HandleCallBack = (data, status) => {
    SetPages(1);
    if (status == 1) {
      StudentList();
      toast.success(data);
      setCount(Count + 1);
      setModalAdd(false);
      setModalUpdate(false)
    } else {
      toast.warn(data);
      setCount(Count + 1);
    }
  };


  return (
    <div className="page-content">
      <Container fluid>
        <ToastContainer limit={1} />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className=" ">Student List</h5>
                  </div>
                  <div className="col-sm-auto">
                    <Button
                      className="mx-1 btn-success border"
                      onClick={() => setModalAdd(!modalAdd)}
                    >
                      + Add Student
                    </Button>
                    <Button className="btn btn-primary mx-2">Export</Button>
                    <Button className="mx-2 btn-danger">PDF</Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0 table-responsive">
                <table className="align-middle table-nowrap table table-hover text-center">
                  <thead className="table-light text-muted text-uppercase">
                    <tr>
                      <th style={{ cursor: "pointer" }}>sr no</th>
                      <th style={{ cursor: "pointer" }}>Name</th>
                      <th style={{ cursor: "pointer" }}>Image</th>
                      <th style={{ cursor: "pointer" }}>Address</th>
                      <th style={{ cursor: "pointer" }}>Mobile Number</th>
                      <th style={{ cursor: "pointer" }}>Addmission Date</th>
                      <th style={{ cursor: "pointer" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                      <tr>
                        <td>1</td>
<td>name</td>
                        <td>

                          <img
                            // src={`${IMG_url}/subject/${item.subject_featured_image}`}
                            alt=""
                            height="80px"
                            width="80px"
                            // onClick={() => openModal(`${IMG_url}/subject/${item.subject_featured_image}`)}
                          />

                        </td>
                        <td>Address</td>
                        <td>Mobile Number
                        </td>
                        <td>Date</td>
                        


                        <td>
                          <FaPen
                            className="btn-sm mx-1 text-primary me-3"
                            // onClick={() => UpdateHandel(item)}
                          />
                          <FaTrash className="btn-sm mx-1 text-danger"
                            // onClick={(e) => DeleteHandel(item.subject_id)}
                          />
                        </td>
                      </tr>
                  
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modalDelete} centered>
          <ModalHeader toggle={() => setModalDelete(false)}>
            Confirm Deletion
          </ModalHeader>
          <ModalBody>
            <div className="mt-2 text-center">
              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure ?</h4>
                <p className="text-muted mx-4 mb-0">
                  Are you Sure You want to Remove this  ?
                </p>
              </div>
            </div>

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setModalDelete(false)}>
              Cancel
            </Button>
            <Button color="danger"
            //  onClick={onDelete}
             >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </Container>


      {modalAdd && (
        <StudentAdd
          modalAdd={modalAdd}
          setModalAdd={() => setModalAdd(false)}
          HandleCallBack={HandleCallBack}
        />
      )}
      {/* {modalUpdate && (
        <SubjectUpdate
          modalAdd={modalUpdate}
          upadteData={upadteData}
          setModalUpdate={() => setModalUpdate(false)}
          HandleCallBack={HandleCallBack}
        />
      )} */}

      {/* <ImageModal imageSrc={modalImage} onClose={closeModal} /> */}
    </div>
  );
};

export default StudentList;

