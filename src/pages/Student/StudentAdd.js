import React, { useCallback, useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
  Row,
  Col,
} from "reactstrap";
import { FaBackspace, FaSave } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import CustomInput from "../Unit/Input";

const StudentAdd = (props) => {
  const [formData, setFormData] = useState({
    subject_title: "",
    subject_status: "",
    subject_description: "",
    subject_featured_image: null,
    subject_intro_vedio: "",
  });

  const [formErrors, setFormErrors] = useState({
    subject_title: false,
  });

  const onDropImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prevData) => ({
        ...prevData,
        subject_featured_image: { file, preview: URL.createObjectURL(file) },
      }));
    } else {
      alert("Please upload a valid image file.");
    }
  }, []);

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive,
  } = useDropzone({
    onDrop: onDropImage,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (loading) return;

    let errors = {};

    if (!formData.subject_title) errors.subject_title = "Title is required";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      const data = new FormData();
      data.append("subject_title", formData.subject_title);
      data.append("subject_status", formData.subject_status);
      data.append("subject_description", formData.subject_description);

      if (formData.subject_featured_image?.file)
        data.append(
          "subject_featured_image",
          formData.subject_featured_image.file
        );
      if (formData.subject_intro_vedio)
        data.append("subject_intro_vedio", formData.subject_intro_vedio);
    }
  };

  return (
    <div>
      <Modal id="showModal" size="xl" isOpen={props.modalAdd} centered>
        <ModalHeader
          toggle={() => props.setModalAdd(false)}
          className="bg-light"
        >
          <h4>Create Student</h4>
        </ModalHeader>
        <div className="tablelist-form">
          <ModalBody>
            <Card className="border card-border-success p-3 shadow-lg">
              <div className="mb-3">
                <Row>
                  <Col lg={3}>
                    <Label
                      htmlFor="categoryname-field"
                      className="form-label fw-bold d-flex justify-content-between  mt-3"
                    >
                      <div>
                        Student Name <span className="text-danger">*</span>{" "}
                      </div>
                      <div style={{ color: "red" }}></div>
                    </Label>
                    <CustomInput
                      id="role-name-field"
                      className="form-control fw-bold"
                      placeholder="Employee Name"
                      type="text"
                      name="name"
                    />
                  </Col>
                  <Col lg={3}>
                    <Label
                      htmlFor="customername-field"
                      className="form-label fw-bold d-flex justify-content-between  mt-3"
                    >
                      <div>
                        Gender<span className="text-danger fw-bold"></span>
                      </div>
                    </Label>

                    <Select
                      name="shift_id"
                      id="shift_id"
                      className="fw-bold"
                      placeholder="Select Gender"
                    />
                  </Col>
                  <Col lg={8} className="mt-3">
                    <Label className="fw-bold">Address</Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formData.subject_description}
                      onChange={(event, editor) => {
                        setFormData({
                          ...formData,
                          subject_description: editor.getData(),
                        });
                      }}
                    />
                  </Col>
                  <Col lg={4} className="mt-3">
                    <Label className="fw-bold">Student Image</Label>
                    <div
                      {...getImageRootProps()}
                      style={{
                        width: "100%",
                        height: "200px",
                        border: formData.subject_featured_image
                          ? "2px solid #ccc"
                          : "2px dashed #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#f9f9f9",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <input {...getImageInputProps()} />
                      {formData.subject_featured_image ? (
                        <img
                          src={formData.subject_featured_image.preview}
                          alt="Selected"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            borderRadius: "5px",
                            objectFit: "cover",
                          }}
                        />
                      ) : isImageDragActive ? (
                        <p>Drop the file here...</p>
                      ) : (
                        <p>Drag & drop an image here, or click to select one</p>
                      )}
                    </div>

                    <Label className="mt-3 fw-bold">Intro Video</Label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Enter video URL"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subject_intro_vedio: e.target.value,
                        })
                      }
                      name="subject_intro_vedio"
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </ModalBody>
        </div>

        <ModalFooter className="d-flex justify-content-end">
          <Button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            <FaSave /> Save
          </Button>
          <Button
            className="btn btn-danger ms-2"
            onClick={() => props.setModalAdd(false)}
          >
            <FaBackspace /> Close
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default StudentAdd;
