import { Link } from 'react-router-dom';

function UserList(params) {
  // obtain the list of user's sent through and the type of list
  const { user, listType } = params;

  return (
    <>
      {/* The modal will be titled by whatever the user passes through as the typeList, allowing it to be used wherever needed */}
      <div
        className='modal fade'
        id={`${listType}Modal`}
        tabIndex='-1'
        aria-labelledby={`${listType}Modal`}
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{listType}</h5>
              <button
                type='button'
                className='btn-close'
                data-mdb-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            {/* render the list of users */}
            <div className='modal-body'>
              {user.map((user) => {
                return (
                  <>
                    <Link to={`/profile/${user.username}`} key={user.username}>
                      {user.name} @{user.username}, {user.followerCount}{' '}
                      Followers
                    </Link>
                    <br />
                  </>
                );
              })}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-mdb-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserList;
