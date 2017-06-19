import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UserCheckbox extends Component {
    static propTypes = {
        postAuthorChange: PropTypes.func.isRequired,
        userId: PropTypes.number.isRequired,
        checked: PropTypes.bool
    }
    render() {
        return (
            <div onChange={this.props.postAuthorChange} className="radio">
                <label>
                    <input type="radio" name="userId" value={this.props.userId} defaultChecked={this.props.checked}/>
                    {`User ${this.props.userId}`}
                </label>
            </div>
        );
    }
}

export default UserCheckbox;
    