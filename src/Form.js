import React from 'react';
import './Form.css';
import BeautyStars from 'beauty-stars';

class Form extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            value: 0,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeDir = this.onChangeDir.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
      }

    onChangeTitle(e){
        this.props.onChangeTitle(e.target.value);
    } 

    onChangeDesc(e){
        this.props.onChangeDesc(e.target.value);
    } 

    onChangeDir(e){
        this.props.onChangeDir(e.target.value);
    } 

    onChangeRating(e){
        this.setState({value: e})
        console.log(e)
        this.props.onChangeRating(e);
        
    } 
      
   onSubmit(e){
    e.preventDefault();
    this.props.onSubmit(true)

}
    

    render(){

        let ratingValue;
        if (this.props.rating !== undefined){
            ratingValue = this.props.rating;
        } else {
            ratingValue = this.state.value;
        }

        return (<div className = "form-box">
                     <form onSubmit={this.onSubmit}>
                        <label>Title:</label>
                        <input className="input-box" type="text" value={this.props.title} title={this.props.value} onChange={this.onChangeTitle}/>
                        <label>Director:</label>
                        <input className="input-box" type="text" value={this.props.director} director={this.props.value} onChange={this.onChangeDir}/>
                        <label>Description:</label>
                        <textarea className="input-box desc" type="text" value={this.props.description} description={this.props.value} onChange={this.onChangeDesc}/>
                        <label>Rating</label>
                        <span className="rating-choice">
                            <BeautyStars 
                                size="20px" 
                                rating={this.props.rating} 
                                onChange={this.onChangeRating} 
                                value={ratingValue} 
                                inactiveColor="#d1d1d1" 
                                activeColor="orange"
                            />
                        </span>
                        <button className="submit-button">Submit</button>
                     </form>
                </div>)
    }
}

export default Form;
