import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Contact from "../component/Contact";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		const startAgenda = async () => {
			await actions.getContacts();
		};

		startAgenda();
	}, []);

	return (
		<div className="container">
            <div className="mb-4 d-flex">
                <Link className="ms-auto" to="/AddContact">
                    <button className="btn btn-success">Add contact</button>
                </Link>
            </div>
			<ul className="list-unstyled">
				{store.contacts && store.contacts.map((contact,index) => (
					<Contact key={index} contact={contact} onDelete={() => actions.deleteContact(contact.id)} />
				))}
			</ul>
		</div>
	);
};

export default Home;