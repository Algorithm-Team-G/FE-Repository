import React from "react";
import "./RoleList.css";

const RoleList = ({ roles }) => {
    return (
        <div className="role-list">
            {roles.map((role, index) => (
                <div key={index} className="role">
                    <span className="role-type">{role.type}</span>
                    <span className="role-name">{role.name}</span>
                </div>
            ))}
        </div>
    );
};

export default RoleList;
