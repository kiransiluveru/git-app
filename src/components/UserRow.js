import React from 'react';
import {Link} from 'react-router';

const UserRow = (props) => {
    const { userObj, onProfileClick } = props;
    return (
        <div className="parent-user">
            <span
                onClick={onProfileClick}
                className="cursor-hand"
            >
                <Link  to={`/user/${userObj.login}`}><img className="img" src={userObj.avatar_url} /></Link>
                </span>
            <div className="user-info">
                <span>UserName:{'           '}<b>{userObj.login}</b></span>
                <span>Profile URL:{'           '} {userObj.url}</span>
                <span>Repos:{'           '}{userObj.repos_url} </span>
            </div>
        </div>
    );
}

export default UserRow;