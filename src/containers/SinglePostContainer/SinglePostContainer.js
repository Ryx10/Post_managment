import React, {Component} from 'react';
import Preloader from '../../components/Preloader/Preloader';
import PropTypes from 'prop-types';
import UsersRadioGroup from '../../components/UsersRadioGroup/UsersRadioGroup';
import AlertContainer from 'react-alert';
import {Link} from 'react-router-dom';
import Comment from '../../components/Comment/Comment';
import {baseConfig, ADDED, UPDATED} from '../../config';
import {fetchPostData, postUpdate} from '../../actions/actionsCreators';
import 'whatwg-fetch';
import {connect} from "react-redux";
import AccessChecker from '../../components/AccessChecker/AccessChecker';


class SinglePostContainer extends Component {
    static propTypes = {
        fetchPostData: PropTypes.func.isRequired,
        postUpdate: PropTypes.func.isRequired,
        body: PropTypes.string,
        userId: PropTypes.number,
        comments: PropTypes.array,
        showPreloader: PropTypes.bool,
        users: PropTypes.array,
        match: PropTypes.object,
        title: PropTypes.string,
        postId: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.props.fetchPostData(false, this.props.match.params.id);
    }
    __postContentChange = (evt) => {
        this.props.postUpdate(evt);
    }
    __savePost = (e) => {
        e.preventDefault();
        if(this.__validateFields()) {
            const postData = {
                "title": this.props.title,
                "body": this.props.body,
                "userId": this.props.userId,
            };
            const url = this.props.match.params.id === baseConfig.routes.new ? `${baseConfig.api.baseUrl}posts` : `${baseConfig.api.baseUrl}posts/${this.props.match.params.id}`;
            const method = this.props.match.params.id === baseConfig.routes.new ? baseConfig.method.POST : baseConfig.method.PUT;
            const saveAction = this.props.match.params.id === baseConfig.routes.new ? ADDED : UPDATED;
            console.log(JSON.stringify(postData), method);
            fetch(url, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postData)
            })
                .then(() => this.__showAlert(`Post successfully ${saveAction}`, 'success'))
                .catch(() => this.__showAlert('Something went wrong', 'error'));
        }
    }
    __validateFields() {
        let validation = true;
        console.log(this.props);
        if(!this.props.title) {
            this.__showAlert('Title is required', 'error');
            validation = false;
        }
        if(!this.props.body) {
            this.__showAlert('Body is required', 'error');
            validation = false;
        }
        if(!this.props.userId) {
            this.__showAlert('User is required', 'error');
            validation = false;
        }
        return validation;
    }
    __renderComments() {
        return(
            <div className="comment-box">
                <h3 className="comment-box__title">Comments</h3>
                {this.props.comments.map((comment) => <Comment key={comment.id} {...comment} />)}
            </div>
        );
    }
    __renderPreloader() {
        const classNames = this.props.showPreloader ? 'preloader' : 'preloader is-hidden';
        return <Preloader classNames={classNames}/>;
    }
    __togglePreloader = () => {
        const togglePreloader = !this.props.showPreloader;
        this.setState({...this.props, showPreloader: togglePreloader});
    }
    __showAlert = (meassage, type) => {
        this.msg.show(meassage, {
            time: 5000,
            type: type,
            theme: 'light'
        });
    }
    render() {
        return (
            <AccessChecker>
                <div className="container">
                    <div className="row">
                        <form action="#" onSubmit={this.__savePost}>
                            <h2>{this.props.title}</h2>
                            <div className="form-group col-md-6 row">
                                <input name="title" onChange={this.__postContentChange} className="form-control" type="text" placeholder="Title" value={this.props.title}/>
                            </div>
                            <div className="form-group">
                                <textarea name="body" onChange={this.__postContentChange} className="form-control" cols="30" rows="10" placeholder="Content.." value={this.props.body} />
                            </div>
                            <UsersRadioGroup postAuthorChange={this.__postContentChange} users={this.props.users} userId={this.props.userId}/>
                            <div className="btn_box">
                                <button className="btn btn-default" type="submit">Save changes</button>
                                <Link to="/">
                                    <button className="btn btn-default pull-right">Cancel</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                    {this.props.postId > 0 && this.__renderComments()}
                </div>
                <AlertContainer ref={a => this.msg = a} />
                {this.__renderPreloader()}
            </AccessChecker>
    );
    }
}

const mapStateToProps = state => ({
        showPreloader: state.postData.showPreloader,
        users: state.postData.users,
        title: state.postData.title,
        body: state.postData.body,
        userId: state.postData.userId,
        comments: state.postData.comments
});

const mapDispatchToProps = dispatch => ({
    fetchPostData: (isNew, postId) => dispatch(fetchPostData(isNew, postId)),
    postUpdate: (evt) => dispatch(postUpdate(evt))
});


export default connect(mapStateToProps, mapDispatchToProps)(SinglePostContainer);
    