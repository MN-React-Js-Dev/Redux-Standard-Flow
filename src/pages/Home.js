import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, loadUsersStart } from "../redux/actions";
import { NavLink } from "react-router-dom";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  useEffect(() => error && toast.error(error), [error]);

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that user ?")) {
      dispatch(deleteUserStart(id));
      toast.success("User Deleted Successfully");
    }
  };
  return (
    <div className="container" style={{ marginTop: "150px" }}>
      <div className="ui-search">
        <input
          type="text"
          placeholder="Search Contact's"
          className="prompt"
          style={{ marginBottom: "10px", marginLeft: "953px", width: "339px" }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <i className="search icon"></i>
        <NavLink to="/addUser" >
          <img
            src="http://simpleicon.com/wp-content/uploads/add-user.png"
            style={{
              height: " 42px",
              marginBottom: "6px",
              marginTop: "-54px",
              marginRight: "92%",
            }}
          />
        </NavLink>
      </div>
      <MDBTable>
        <MDBTableHead dark style={{ width: "122px" }}>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">ID</th>
            <th scope="col">
              Title {/* <i class="fas fa-arrows-alt-v"></i> */}
            </th>

            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        {users.length > 0 ? (
          users
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.description.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item, index) => (
              <MDBTableBody key={index}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>

                  <td>
                    <MDBBtn
                      className="m-1"
                      tag="a"
                      color="none"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MDBTooltip title="Delete" tag="a">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </MDBBtn>
                    <Link to={`/editUser/${item.id}`}>
                      <MDBTooltip title="Edit" tag="a">
                        <MDBIcon
                          fas
                          icon="pen"
                          style={{ color: "#55acee", marginBottom: "10px" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </Link>
                    <Link to={`/userInfo/${item.id}`}>
                      <MDBTooltip title="View" tag="a">
                        <MDBIcon
                          fas
                          icon="eye"
                          style={{ color: "#3b5998", marginBottom: "10px" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </Link>
                  </td>
                </tr>
              </MDBTableBody>
            ))
        ) : (
          <tr>
            <th> Sorry We Can't Any Get Any Data</th>
          </tr>
        )}
      </MDBTable>
    </div>
  );
};

export default Home;
