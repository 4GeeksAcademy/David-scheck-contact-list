const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			agenda: "davidscheck"
		},
		actions: {
			// Use getActions to call a function within a fuction
			addContact: async (contact) => {
				const agendaName = getStore().agenda;
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts`, {
						method: "POST",
						body: JSON.stringify(contact),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (!response.ok) {
						throw Error("Error creating contact");
					}
					const data = await response.json();
					setStore({ contacts: [...getStore().contacts, data] });
				} catch (error) {
					console.error("Error adding contact:", error);
				}
			},


			getContacts: async () => {
				const agendaName = getStore().agenda;
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}`);
						if (response.status === 404) {
							await getActions().createAgenda();
							await getActions().getContacts();
						}
						if (!response.ok) {
							throw Error("Error fetching contacts");
						}
						const data = await response.json();
						setStore({ contacts: data.contacts});
				} catch (error) {
					console.error("Error getting contacts:", error);
				}
			},

			editContact: async (contact, id) => {
				const agendaName = getStore().agenda;
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${id}`, {
						method: "PUT",
						body: JSON.stringify(contact),
						headers: {
							"Content-Type": "application/json"
						}
					});
				if (response.ok) {
					const actions = getActions();
					actions.getContacts();
				} else {
					throw Error("Error updating contact");
				} 
			} catch (error) {
					console.error("Error editing contact:", error);
					throw error;
				}
			},

			createAgenda: async () => {
				const agendaName = getStore().agenda;
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}`, {
						method: "POST",
						body: JSON.stringify({}),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						const newAgenda = await response.json();
						console.log("agenda created;", newAgenda);
					}
				} catch (error) {
					console.error("Error creating agenda:", error);
				}
			},

			deleteContact: async (id) => {
				const agendaName= getStore().agenda;
				try {
					const response = await fetch (`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${id}`, {
						method: "DELETE"
					});
					if (response.ok) {
						getActions().getContacts();
						const contactsUpdated = getStore().contacts.filter(contact => contact.id != id);
						setStore({ contacts: contactsUpdated});
					} else {
						throw Error("Error deleting contact");
					}
				} catch (error) {
					console.error("Error deleting contact:", error);
				}
			},
		
		},
	};
};


		export default getState;
