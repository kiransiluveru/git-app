import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            userProfileInfo:{},
            isCallInProgress: false
        }
    }

    componentDidMount(){
        const { userName } = this.props.params;
        this.setState({ isCallInProgress: true })
        axios.get(`https://api.github.com/users/${userName}`, {
            headers: {
                'Authorization': 'token ee86ae4dbcd43ea38ee3c058496c45d203619502'
            }
        })
            .then(response => this.setState({ userProfileInfo: response.data, isCallInProgress: false }));
    }

    render() {
        console.log('this.props', this.props);
        const { userProfileInfo, isCallInProgress } = this.state;
        if(isCallInProgress){
            return(
                <div className="spinner-border text-primary spinner-position" role="status">
                    <span className="visually-hidden"></span>
                </div>)
        }
        return (
            Boolean(Object.keys(userProfileInfo)) &&
            <div className="container dflex-center">
                <button onClick={() => this.props.router.goBack()} type="button" className="btn btn-primary" name="Goto Users">
                     Back to Users
                </button>
                <br />
                <br />
                <h1>USER PROFILE</h1>
                <span><img className="h-100px w-100px" src={userProfileInfo.avatar_url} /></span>
                <span>Name: <b>{userProfileInfo.name}</b></span>
                {userProfileInfo.company && <span>Company: {userProfileInfo.company}</span>}
                {userProfileInfo.blog && <span>Blog: {userProfileInfo.blog}</span>}
                {userProfileInfo.location && <span>Location: {userProfileInfo.location}</span>}
                {userProfileInfo.email && <span>Email: {userProfileInfo.email}</span>}
                <span>Public Repos:  {userProfileInfo.public_repos}</span>
                <span>Public Gists:  {userProfileInfo.public_gists}</span>
                <span>Followers:  {userProfileInfo.followers}</span>
                <span>Following:  {userProfileInfo.following}</span>
            </div>
        );
    }
}

export default UserProfile;


// {
//     "login": "jamesgolick",
//     "id": 37,
//     "node_id": "MDQ6VXNlcjM3",
//     "avatar_url": "https://avatars2.githubusercontent.com/u/37?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/jamesgolick",
//     "html_url": "https://github.com/jamesgolick",
//     "followers_url": "https://api.github.com/users/jamesgolick/followers",
//     "following_url": "https://api.github.com/users/jamesgolick/following{/other_user}",
//     "gists_url": "https://api.github.com/users/jamesgolick/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/jamesgolick/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/jamesgolick/subscriptions",
//     "organizations_url": "https://api.github.com/users/jamesgolick/orgs",
//     "repos_url": "https://api.github.com/users/jamesgolick/repos",
//     "events_url": "https://api.github.com/users/jamesgolick/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/jamesgolick/received_events",
//     "type": "User",
//     "site_admin": false,
//     "name": "James Golick",
//     "company": "Normal",
//     "blog": "http://jamesgolick.com",
//     "location": "New York",
//     "email": null,
//     "hireable": null,
//     "bio": null,
//     "twitter_username": null,
//     "public_repos": 110,
//     "public_gists": 114,
//     "followers": 606,
//     "following": 30,
//     "created_at": "2008-01-19T22:52:30Z",
//     "updated_at": "2019-06-05T00:04:42Z"
//   }