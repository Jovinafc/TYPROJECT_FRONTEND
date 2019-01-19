import React, {Component} from 'react';
import classes from './Photo.module.css';
import ProfNav from '../ProfNav/ProfNav';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import LoadingOverlay from 'react-loading-overlay';
 
class Photo extends Component {

    

    state = {
        file: '',
        imagePreviewUrl: '',
    }

    componentDidMount = () => {
        axios.post('http://localhost:3001/fetch-user', {user_id: this.props.user_id})
        .then(res => {
            if(res.data.image){
                this.setState({
                    imagePreviewUrl: res.data.image
                })

            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.photoProcess(this.props.user_id);
        const fd = new FormData();
        fd.append('profileImage',this.state.file);
        axios.post('http://localhost:3001/profileImage',fd).then(()=>{
            console.log('Image Sent');
            

            axios.post('http://localhost:3001/update-profile-image', {user_id:this.props.user_id})
            .then(res => {
                console.log('Uploaded Profile Image');
                this.props.user_data(this.props.user_id);
            });
        }).catch(e=>{
            console.log(e)

        })



    }

    handleChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onload = (e) => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    

    render () {
        let styles = {
            scroll: 'no'
        }
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if(imagePreviewUrl) {
            imagePreview = (<img style={styles} className={classes.Image} src={imagePreviewUrl} alt="P" />);
        }

        let preImage = (<div className={classes.preImage}></div>    )

        return (
            <LoadingOverlay  active={this.props.upload} spinner text='Photo Uploading'>

            <div className={classes.Container}>

                <div className={classes.Menu}>
                    <ProfNav />
                </div>

                <div className={classes.Main}>
                    <h3>Profile Photo</h3>

                    <div>
                        <div className={classes.ImageCont}>
                            {this.state.imagePreviewUrl !== ''
                            ? imagePreview
                            : preImage } 
                        </div>

                        <form className={classes.Form} onSubmit={this.handleSubmit} >
                            <input type="file" onChange={this.handleChange} />
                            <br />
                            <br />
                            <button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>Upload Image</button>
                        </form>
                        


                    </div>

                </div>


            </div>
            </LoadingOverlay>

        );
    }
}

const mapStateToProps = state => {
    return {
        user_id : state.auth.userId,
        upload: state.auth.photoadd
    }
}

const mapDispatchToProps = dispatch => {
    return {
        user_data : (user) => dispatch(actions.userData(user)),
        photoProcess: (user) => dispatch(actions.photoProcess(user))   
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Photo);