import axios from 'axios';
import { connect} from 'react-redux'; 

const instance = axios.create({
    baseURL : 'http://localhost:3001'
});

// instance.defaults.headers.common['x-auth'] = localStorage.getItem('token');

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

export default connect(mapStateToProps, null)(instance); 