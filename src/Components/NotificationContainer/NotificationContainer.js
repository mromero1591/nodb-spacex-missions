import React from "react";
import './NotificationContainer.css';

export default function NotificationContainer(props) {
    return(
        <div className='notification'>
            There was an erorr getting the current flight. Only flights between 1 - 98 are allowed.
        </div>
    );
}