import React, {Component} from 'react';
import classes from './Photo.module.css';
import ProfNav from '../ProfNav/ProfNav';

class Photo extends Component {
    state = {
        file: '',
        imagePreviewUrl: ''
    }

    handleSubmit = e => {
        e.preventDefault();
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
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if(imagePreviewUrl) {
            imagePreview = (<img className={classes.Image} src={imagePreviewUrl} alt="P" />);
        }

        let preImage = (<div className={classes.preImage}></div>    )

        return (
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
        );
    }
}


export default Photo;