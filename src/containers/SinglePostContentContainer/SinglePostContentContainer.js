import React, {Component} from 'react';
import UsersRadioGroup from '../../components/UsersRadioGroup/UsersRadioGroup';
import CommentsContainer from '../CommentsContainer/CommentsContainer';
import './single-post-content-container.scss';
import baseConfig from '../../config';
import 'whatwg-fetch';
import PropTypes from 'prop-types';

class SinglePostContentContainer extends Component {
    static propTypes = {
        showAlert: PropTypes.func,
        title: PropTypes.string,
        postId: PropTypes.string,
        togglePreloader: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            title: '',
            body:  '',
            userId:  ''
        };
    }
    componentDidMount() {
        const urlForUsers = `${baseConfig.api.baseUrl}users`;
        const urlForPost = `${baseConfig.api.baseUrl}posts/${this.props.postId}`;
        const headers = {headers: baseConfig.api.headers};
        this.props.togglePreloader();
        if(this.props.postId !== 'new') {
            fetch(urlForPost, headers)
                .then((post) => post.json())
                .then((postData) => {
                    fetch(urlForUsers, headers)
                        .then((users) => users.json())
                        .then((usersData) => {
                            const newState = {
                                title: postData.title,
                                body: postData.body,
                                userId: String(postData.userId),
                                postId: postData.id,
                                users: usersData
                            };
                            this.setState(Object.assign(this.state, newState));
                            this.props.togglePreloader();
                        });
                })
                .catch((err) => console.error(err));
        } else if(this.props.postId === 'new') {
            fetch(urlForUsers, headers)
                .then((users) => users.json())
                .then((usersData) => {
                    const newState = {
                        users: usersData
                    };
                    this.setState(Object.assign(this.state, newState));
                    this.props.togglePreloader();
                });
        }

    }

    __postTitleChange = (e) => {
        this.setState(Object.assign(this.state, {title: e.target.value}));
    }
    __postBodyChange = (e) => {
        this.setState(Object.assign(this.state, {body: e.target.value}));
    }
    __postAuthorChange = (e) => {
        this.setState(Object.assign(this.state, {userId: String(e.target.value)}));
    }
    __savePost = (e) => {
        e.preventDefault();
        if(this.__validateFields()) {
            const postData = {
                "title": this.state.title,
                "body": this.state.body,
                "userId": String(this.state.userId),
            };
            const url = this.props.postId === 'new' ? `${baseConfig.api.baseUrl}posts` : `${baseConfig.api.baseUrl}posts/${this.props.postId}`;
            const method = this.props.postId === 'new' ? 'POST' : 'PUT';
            const saveAction = this.props.postId === 'new' ? 'added' : 'updated';
            fetch(url, {
                method: method,
                headers: baseConfig.api.headers,
                body: JSON.stringify(postData)
            })
                .then(() => this.props.showAlert(`Post successfully ${saveAction}`, 'success'))
                .catch(() => this.props.showAlert('Something went wrong', 'error'));
        }
    }
    __validateFields() {
        let validation = true;
        if(!this.state.title.length) {
            this.props.showAlert('Title is required', 'error');
            validation = false;
        }
        if(!this.state.body.length) {
            this.props.showAlert('Body is required', 'error');
            validation = false;
        }
        if(!this.state.title.length) {
            this.props.showAlert('User is required', 'error');
            validation = false;
        }
        return validation;
    }
    __renderCommentsContainer() {
        if(this.state.postId > 0) {
            return (
                <div className="row">
                    <CommentsContainer postId={this.state.postId} />
                </div>
            );
        }
    }
    render() {
        return (
        <div className="container">
            <div className="row">
                <form action="#" onSubmit={this.__savePost}>
                    <h2>{this.props.title}</h2>
                    <div className="form-group col-md-6 row">
                        <input onChange={this.__postTitleChange} className="form-control" type="text" placeholder="Title" value={this.state.title}/>
                    </div>
                    <div className="form-group">
                        <textarea onChange={this.__postBodyChange} className="form-control" cols="30" rows="10" placeholder="Content.." value={this.state.body} />
                    </div>
                    <UsersRadioGroup postAuthorChange={this.__postAuthorChange} users={this.state.users} userId={this.state.userId}/>
                    <div className="btn_box">
                        <button className="btn btn-default" type="submit">Save changes</button>
                        <button className="btn btn-default pull-right">Cancel</button>
                    </div>
                </form>
            </div>
            {this.__renderCommentsContainer()}
        </div>
        );
    }
}

export default SinglePostContentContainer;
    