import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";

const initialState = {
  id: "",
  title: "",
  description: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { users } = useSelector((state) => state.data);
  const [editMode, setEditMode] = useState(false);
  // const { name, email, phone, address } = formValue;
  var { id, title, description } = formValue;
  const history = useHistory();
  const dispatch = useDispatch();
  var { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      setFormValue({ ...singleUser });
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User Added Successfully");
        setTimeout(() =>
          history.push("/"),
          500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User Updated Successfully");
        setTimeout(() => history.push("/"), 500);
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log("form Value Checked..", formValue);
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">
        {!editMode ? "Add User Detail" : "Update User Detail"}
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={title || ""}
          name="title"
          type="text"
          onChange={onInputChange}
          required
          label="title"
          validation="Please provide a title"
          invalid
        />
        <br />
        <MDBInput
          value={description || ""}
          name="description"
          type="text"
          onChange={onInputChange}
          required
          label="description"
          validation="Please provide an description"
          invalid
        />
        <br />

        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            {!editMode ? "Add" : "Update"}
          </MDBBtn>
          <MDBBtn onClick={() => history.push("/")} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
