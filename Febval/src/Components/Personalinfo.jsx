import React, { useState, useEffect } from "react";
import "../Scss/personalinfo.scss";
import { Container, Button, Table } from "react-bootstrap";
import Order from "../Assets/order.svg";
import Updatedetails from "./Updatedetails";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../Auth/auth";

const Personalinfo = () => {
    const [user, setUser] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getUser()
            .then((user) => {
                setUser(user);
            })
            .catch((err) => {
                setUser(null);
                navigate("/");
            });
    }, []);

    return (
        <>
            <Container>
                <div className="info-container">
                    <div className="manage-account">
                        <h1>Manage My Account</h1>
                        <div className="detail-container">
                            <div className="personal-details">
                                <div className="details">
                                    <text>Personal Details</text>
                                    <div className="personal-name">
                                        {user ? user.displayName : "Loading..."}
                                    </div>
                                    <div className="personal-email">
                                        {user ? user.email : "Loading..."}
                                    </div>
                                    <div className="personal-number">
                                        9800000000
                                    </div>
                                    <div className="edit-det">
                                        <Button
                                            onClick={() => setModalShow(true)}
                                        >
                                            EDIT
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="address-book">
                                <div className="address">
                                    <h1>Address Book</h1>
                                    <h2>
                                        Adderss Book new road, makhan galli -
                                        30, kathmandu
                                    </h2>
                                    <div className="edit-det">
                                        <Button
                                            onClick={() => setModalShow(true)}
                                        >
                                            EDIT
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-container">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Order#</th>
                                    <th>Placed on</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>01065554</td>
                                    <td>11/12/1900</td>
                                    <td>
                                        <img src={Order} alt="..." />
                                    </td>
                                    <td>Rs. 900</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
            <Updatedetails
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default Personalinfo;
