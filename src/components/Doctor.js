import React, { useState, useEffect } from "react";
import "./Doctor.css"; // Ensure you import your CSS

const Doctor = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.181:8000/admin1/admin-doctor/",
          {
            method: "GET",
            headers: {
              Authorization: "Token 5a9e24c351c3e0c8ec1028e88e6ea27e90f60b75",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        setUsers(json.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setEditUser({ ...user });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.181:8000/admin1/admin-doctor/", // Adjust URL for the endpoint that accepts POST requests
        {
          method: "POST", // Use POST to send data
          headers: {
            Authorization: "Token 5a9e24c351c3e0c8ec1028e88e6ea27e90f60b75",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editUser), // Send updated user data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      const updatedResponse = await response.json();
      // Optionally, you can add the updated user to the state
      setUsers((prev) => [...prev, updatedResponse.data]); // Assuming the response returns the created user
      setSelectedUser(updatedResponse.data); // Update the selected user to the newly created one
      setEditUser(null); // Close the modal
    } catch (error) {
      console.error("Error saving user data:", error);
      setError(error.message); // Handle errors
    }
  };

  const handleCloseModal = () => {
    setEditUser(null);
    setSelectedUser(null); // Clear selected user to hide the profile
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="doctor-container">
      <h1>Doctors List</h1>
      <table className="doctor-table">
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} onClick={() => handleUserClick(user)}>
              <td className="serial-number">{index + 1}</td>
              <td className="username">{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && !editUser && (
        <div className="user-details">
          <h2>Doctor Profile</h2>
          <p>
            <strong>Username:</strong> {selectedUser.username}
          </p>
          <p>
            <strong>Phone Number:</strong> {selectedUser.phone_number}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Specialization:</strong> {selectedUser.specialization}
          </p>
          <button onClick={() => setEditUser(selectedUser)}>Edit</button>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}

      {editUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Doctor Profile</h2>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={editUser.username}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phone_number"
                value={editUser.phone_number}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Specialization:
              <input
                type="text"
                name="specialization"
                value={editUser.specialization}
                onChange={handleEditChange}
              />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctor;
