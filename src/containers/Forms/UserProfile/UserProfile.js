import React, {Component} from 'react';
import classes from './UserProfile.module.css';
import { DatePicker } from 'shineout';

class UserProfile extends Component {
    render () {
        return (
            <div>
                <h2>Update your Profile</h2>
                <form>
                    <div>
                        <label>First Name</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input type="number"/>
                    </div>
                    <div>
                        <label>DOB</label>
                        <DatePicker placeholder="DOB" />
                    </div>
                    <div>
                        <label>Address</label>
                        <textarea type="text"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserProfile;