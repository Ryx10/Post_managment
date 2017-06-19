import React, {Component} from 'react';
import Preloader from '../../components/Preloader/Preloader';
import PropTypes from 'prop-types';
import UsersRadioGroup from '../../components/UsersRadioGroup/UsersRadioGroup';
import CommentsContainer from '../CommentsContainer/CommentsContainer';
import {Link} from 'react-router-dom';
import baseConfig from '../../config';

const urlForUsers = `${baseConfig.api.baseUrl}users`;
const urlForPost = `${baseConfig.api.baseUrl}posts`;
const headers = {headers: baseConfig.api.headers};

class SinglePostContainer extends Component {
    static propTypes = {
        showAlert: PropTypes.func,
        title: PropTypes.string,
        match: PropTypes.object,
        postId: PropTypes.number
    }
    constructor(props) {
        super(props);
        this.state = {
            showPreloader: false,
            users: [],
            title: '',
            body:  '',
            userId:  ''
        };
    }
    componentDidMount() {
        this.__togglePreloader();
        if(this.props.match.params.id !== baseConfig.routes.new) {
            fetch(`${urlForPost}/${this.props.match.params.id}`, headers)
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
                            this.setState({...this.state, ...newState});
                            this.__togglePreloader();
                        });
                })
                .catch((err) => console.error(err));
        } else if(this.props.match.params.id === baseConfig.routes.new) {
            fetch(urlForUsers, headers)
                .then((users) => users.json())
                .then((usersData) => {
                    const newState = {
                        users: usersData
                    };
                    this.setState({...this.state, ...newState});
                    this.__togglePreloader();
                });
        }

    }
    __postContentChange = (e) => {
        let valueToUpdate = {};
        valueToUpdate[e.target.name] = e.target.value;
        this.setState({...this.state, ...valueToUpdate });
    }
    __savePost = (e) => {
        e.preventDefault();
        if(this.__validateFields()) {
            const postData = {
                "title": this.state.title,
                "body": this.state.body,
                "userId": String(this.state.userId),
            };
            const url = this.props.match.params.id === baseConfig.routes.new ? `${baseConfig.api.baseUrl}posts` : `${baseConfig.api.baseUrl}posts/${this.props.postId}`;
            const method = this.props.match.params.id === baseConfig.routes.new ? 'POST' : 'PUT';
            const saveAction = this.props.match.params.id === baseConfig.routes.new ? 'added' : 'updated';
            fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(postData)
            })
                .then(() => this.__showAlert(`Post successfully ${saveAction}`, 'success'))
                .catch(() => this.__showAlert('Something went wrong', 'error'));
        }
    }
    __validateFields() {
        let validation = true;
        if(!this.state.title.length) {
            this.__showAlert('Title is required', 'error');
            validation = false;
        }
        if(!this.state.body.length) {
            this.__showAlert('Body is required', 'error');
            validation = false;
        }
        if(!this.state.title.length) {
            this.__showAlert('User is required', 'error');
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
    __renderPreloader() {
        const classNames = this.state.showPreloader ? 'preloader' : 'preloader is-hidden';
        return <Preloader classNames={classNames}/>;
    }
    __togglePreloader = () => {
        const togglePreloader = !this.state.showPreloader;
        this.setState({...this.state, showPreloader: togglePreloader});
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <form action="#" onSubmit={this.__savePost}>
                            <h2>{this.state.title}</h2>
                            <div className="form-group col-md-6 row">
                                <input name="title" onChange={this.__postContentChange} className="form-control" type="text" placeholder="Title" value={this.state.title}/>
                            </div>
                            <div className="form-group">
                                <textarea name="body" onChange={this.__postContentChange} className="form-control" cols="30" rows="10" placeholder="Content.." value={this.state.body} />
                            </div>
                            <UsersRadioGroup postAuthorChange={this.__postContentChange} users={this.state.users} userId={this.state.userId}/>
                            <div className="btn_box">
                                <button className="btn btn-default" type="submit">Save changes</button>
                                <Link to="/">
                                    <button className="btn btn-default pull-right">Cancel</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    {this.__renderCommentsContainer()}
                </div>
                {this.__renderPreloader()}
            </div>
    );
    }
}

export default SinglePostContainer;
    