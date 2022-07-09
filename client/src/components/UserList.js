import { useState } from "react";
import Modal from "./UserModal";

function UserList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    const [users] = useState([
        
    ]);
const toggleModal = (user, i) => {
    setCurrentUser({...user, index: i});
    setIsModalOpen(!isModalOpen);
}

    return (
        <div>
            {isModalOpen && (
                <Modal onClose={toggleModal} currentUser={currentUser} />
            )}
            <div className="flex-row">
                {currentUser.map((user, i) => (
                    <ul>
                        onClick={() => toggleModal(user, i)}
                        key={user.name}
                    </ul>
                ))}
            </div>
        </div>
    );
};
export default UserList;