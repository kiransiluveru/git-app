import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import UserRow from './UserRow';
import { addUsers, resetUsers } from '../ActionCreators/UsersActions';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            per_page: 10,
            isCallInProgress: false,
            search: ''
        }
        this.stopCall = false;
    }

    // https://api.github.com/users?since=10001&per_page=100

    getUsers = ({ afterReset }) => {
        const { per_page } = this.state;
        let since;
        if (afterReset) {
            since = 0;
        } else {
            const { users } = this.props;
            const last_element = users.slice(-1)[0];
            since = last_element === undefined ? 0 : last_element.id;
        }
        axios.get(`https://api.github.com/users?since=${since}&per_page=${per_page}`, {
            headers: {
                'Authorization': 'token ee86ae4dbcd43ea38ee3c058496c45d203619502'
            }
        })
            .then(response => {
                this.props.dispatch(addUsers(response.data));
            });
    }

    componentDidMount() {
        window.addEventListener("scroll", (event) => {
            const el = event.target.documentElement;
            const bottom = el.scrollHeight - el.scrollTop === el.clientHeight;
            if (bottom) {
                this.handlePagination();
            }
        })
        this.getUsers({});
    }

    handlePagination = () => {
        const { per_page, isCallInProgress } = this.state;
        const { users } = this.props;
        const last_element = users.slice(-1)[0];
        const since = last_element === undefined ? 0 : last_element.id;
        if (this.stopCall) {
            return;
        }
        this.setState({ isCallInProgress: true });
        this.stopCall = true;
        setTimeout(() => {
            axios.get(`https://api.github.com/users?since=${since}&per_page=${per_page}`, {
                headers: {
                    'Authorization': 'token ee86ae4dbcd43ea38ee3c058496c45d203619502'
                }
            })
                .then(response => {
                    this.setState((prevState) => ({
                        isCallInProgress: false
                    }))
                    this.props.dispatch(addUsers(response.data));
                    this.stopCall = false;
                });
        }, 500);
    }

    // https://api.github.com/search/users?q=kiran&page=6&per_page=4
    onSearchUser = debounce(() => {
        const { per_page, search } = this.state;
        this.props.dispatch(resetUsers());
        if (search.trim().length) {
            axios.get(`https://api.github.com/search/users?q=${search}&page=0&per_page=${per_page}`, {
                headers: {
                        'Authorization': 'token ee86ae4dbcd43ea38ee3c058496c45d203619502'
                    }
                })
                    .then(response => {
                        this.props.dispatch(addUsers(response.data.items));
                    });
                } else {
            this.props.dispatch(resetUsers());
            this.getUsers({ afterReset: true });
        }
    }, 1000)

    onChange = (value) => {
        this.setState({ search: value });
        this.onSearchUser();
    }

    render() {
        const { isCallInProgress, search } = this.state;
        const { users } = this.props;
        return (
            <div className="container chec" >
                <h1>Welcome GitHub Users</h1>
                <input type="text" onChange={(e) => this.onChange(e.target.value)} name="search" value={search} placeholder="Search Here..." />
                {
                    Boolean(users) && Boolean(users.length) &&
                    users.map((userObj) => {
                        return <UserRow key={userObj.id} userObj={userObj} />;
                    })
                }
                { isCallInProgress &&
                    <div className="spinner-border text-primary spinner-position" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                }
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
        users: store.git.users,
    }
}

export default connect(mapStateToProps)(Users);