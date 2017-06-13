import React, {Component} from 'react';
import SinglePostContentContainer from '../SinglePostContentContainer/SinglePostContentContainer';
import Preloader from '../../components/Preloader/Preloader';
import PropTypes from 'prop-types';

class SinglePostContainer extends Component {
    static propTypes = {
        showAlert: PropTypes.func,
        title: PropTypes.string,
        match: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            showPreloader: false
        };
    }
    __renderPreloader() {
        const classNames = this.state.showPreloader ? 'preloader' : 'preloader is-hidden';
        return <Preloader classNames={classNames}/>;
    }
    __togglePreloader = () => {
        const togglePreloader = !this.state.showPreloader;
        this.setState(Object.assign(this.state, {showPreloader: togglePreloader}));
    }
    render() {
        return (
            <div>
                <SinglePostContentContainer togglePreloader={this.__togglePreloader} postId={this.props.match.params.id} title={this.props.title} showAlert={this.props.showAlert}/>
                {this.__renderPreloader()}
            </div>
    );
    }
}

export default SinglePostContainer;
    