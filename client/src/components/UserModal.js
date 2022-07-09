import React from 'react';

function Modal({onClose, currentUser}) {
    const {name, username, followerCount} = currentUser
    return (
        <div className='modalBackdrop'>
            <div className='modalContainer'>
                <h3 className='modalTitle'>User List</h3>
                <ul>
                    <li>${name}</li>
                    <li>${username}</li>
                    <li>${followerCount}</li>
                </ul>
                <button onClick={onClose} type='button'>
                    Close
                </button>
            </div>
        </div>
    );
}

export default Modal;