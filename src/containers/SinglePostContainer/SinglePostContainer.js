import React, {Component} from 'react';
import Preloader from '../../components/Preloader/Preloader';
import PropTypes from 'prop-types';
import UsersRadioGroup from '../../components/UsersRadioGroup/UsersRadioGroup';
import AlertContainer from 'react-alert';
import {Link} from 'react-router-dom';
import Comment from '../../components/Comment/Comment';
import {baseConfig, ADDED, UPDATED} from '../../config';
import {fetchPostData, postUpdate, checkBody, checkTitle, checkUser} from '../../actions/actionsCreators';
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
        postId: PropTypes.string,
        titleIsValid: PropTypes.bool.isRequired,
        bodyIsValid: PropTypes.bool.isRequired,
        userIsValid: PropTypes.bool.isRequired,
        checkTitle: PropTypes.func.isRequired,
        checkBody: PropTypes.func.isRequired,
        checkUser: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.props.fetchPostData(false, this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps) {
        nextProps.title && this.props.checkTitle(nextProps.title);
        nextProps.body && this.props.checkBody(nextProps.body);  
        nextProps.userId && this.props.checkUser(nextProps.userId);        
              
    }
    __postContentChange = (evt) => {
        this.props.postUpdate(evt);
        switch (evt.target.name) {
            case 'title':
                this.props.checkTitle(evt.target.value);
                break;
            case 'body':
                this.props.checkBody(evt.target.value);
                break;
            case 'userId':
                this.props.checkUser(evt.terget.value);
                break;
        }
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
        !this.props.titleIsValid && this.__showAlert('Title is required', 'error');
        !this.props.bodyIsValid && this.__showAlert('Post body is required', 'error');
        !this.props.userId && this.__showAlert('You have to choose author', 'error');        
        return this.props.titleIsValid && this.props.bodyIsValid;
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
        comments: state.postData.comments,
        titleIsValid: state.validation.titleIsValid,
        bodyIsValid: state.validation.bodyIsValid,
        userIsValid: state.validation.userId
});

const mapDispatchToProps = dispatch => ({
    fetchPostData: (isNew, postId) => dispatch(fetchPostData(isNew, postId)),
    postUpdate: (evt) => dispatch(postUpdate(evt)),
    checkTitle: value => dispatch(checkTitle(value)),
    checkBody: value => dispatch(checkBody(value)),
    checkUser: value => dispatch(checkUser(value))
});


export default connect(mapStateToProps, mapDispatchToProps)(SinglePostContainer);
    