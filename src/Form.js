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

        let inputTitleColor;
        //console.log("props counter", this.props.title.length)

        let inputDirectorColor;
        let inputDescColor;

        if (this.props.title !== undefined){
            if (this.props.title.length >= 1 && this.props.title.length <= 40){
                inputTitleColor = {color : "#737373"};
            } else {
                inputTitleColor = {color : "red"};
            }
    
            if (this.props.director.length >= 1 && this.props.director.length <= 40){
                inputDirectorColor = {color : "#737373"};
            } else {
                inputDirectorColor = {color : "red"};
            }
    
            if (this.props.description.length >= 1 && this.props.description.length <= 300){
                inputDescColor = {color : "#737373"};
            } else {
                inputDescColor = {color : "red"};
            }
        } 

        return (<div className = "form-box">
                     <form onSubmit={this.onSubmit}>
                        <label>Title:</label>
                        <input className="input-box" style={inputTitleColor} type="text" value={this.props.title} title={this.props.value} onChange={this.onChangeTitle}/>
                        <span className="inputValue" style={inputTitleColor}> {this.props.title.length}/40 characters</span>
                        <label>Director:</label>
                        <input className="input-box" style={inputDirectorColor} type="text" value={this.props.director} director={this.props.value} onChange={this.onChangeDir}/>
                        <span className="inputValue" style={inputDirectorColor}> {this.props.director.length}/40 characters</span>
                        <label>Description:</label>
                        <textarea className="input-box desc" style={inputDescColor} type="text" value={this.props.description} description={this.props.value} onChange={this.onChangeDesc}/>
                        <span className="inputValue" style={inputDescColor}> {this.props.description.length}/300 characters</span>
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
