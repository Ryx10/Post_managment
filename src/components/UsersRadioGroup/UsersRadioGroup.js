import React, {Component} from 'react';
import UserCheckbox from '../UserCheckbox/UserCheckbox';
import PropTypes from 'prop-types';

class UsersRadioGroup extends Component {
    static propTypes = {
        postAuthorChange: PropTypes.func.isRequired,
        users: PropTypes.array,
        userId: PropTypes.string.isRequired

    }
    __renderUsers() {
        return this.props.users.map((user) => <UserCheckbox postAuthorChange={this.props.postAuthorChange}
                                                            key={user.id}
                                                            ref={this.props.userId}
                                                            userId={user.id}
                                                            checked={this.props.userId === String(user.id)}/>);
    }

    render() {
        return (
            <div>
                {this.__renderUsers()}
            </div>
        );
    }
}

export default UsersRadioGroup;
    