
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const AddContact = () => {
    const {actions} = useContext(Context);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        actions.addContact(data);
        navigate("/");
    
};

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center fs-1">
                <p>Add new contact</p>
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label fw-bold">Full Name</label>
                    <input type="text" name="name" className="form-control" id="Name" placeholder="Full Name"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label fw-bold">Email</label>
                    <input type="email" name="email" className="form-control" id="Email" placeholder="Enter email"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label fw-bold">Phone</label>
                    <input type="text" name="phone" className="form-control" id="Phone" placeholder="Enter phone"
                        onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Address" className="form-label fw-bold">Address</label>
                    <input type="text" name="address" className="form-control" id="Address" placeholder="Enter address"
                        onChange={handleChange} />
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>Save</button>
                <Link to="/">
                    <button className="btn btn-secondary w-100 mt-2">Back to contacts</button>
                </Link>
            </form>
        </div>
    );
};