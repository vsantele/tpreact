import React from 'react';
import PropTypes from 'prop-types'
import shuffle from 'shuffle-array'


export default class Row extends React.Component {

    static propTypes = {
        tp: PropTypes.array,
        random: PropTypes.array,
      }
    constructor() {
        super()

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    /*random() {
        let lengthArray = this.props.tp.length;
        var random = [];
        for(let x; x < lengthArray; x++){
            let randomNb = Math.floor(Math.random()*3);
            random.push(randomNb);
        }
        return random;
    }*/
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    render() {
        const random = this.props.random
        // const listTp = shuffle(this.props.tp)
        const tps = this.props.tp.map(function(tp, i) {
            switch(random[i]){
                case 0:
                    return (
                        <tr key = {i}>
                            <td key = {i + "frLine"} className="visible"> <span id={"word"+ i} style={{display: "none"}}>{tp.francais}</span><input type="text" name={"input"+i} id= {"input"+ i} onChange={this.handleInputChange.bind(this)}/> </td>
                            <td key = {i + "nlLine"} className="visible"> {tp.neerlandais} </td> 
                            <td key = {i + "ovtLine"} className="visible"> {tp.ovt} </td>
                            <td key = {i + "ppLine"} className="visible"> {tp.participePasse} </td> 
                            <td key = {i + "subLine" }className="visible"> <button  key={i +"subbtn"} className="btn btn-block btn-primary " type="submit" value="Submit" >Submit </button></td>
                        </tr>
                    )
                case 1:
                    return (
                        <tr key = {i}>
                            <td key = {i + "frLine"} className="visible"> {tp.francais}  </td>
                            <td key = {i + "nlLine"} className= {"visible "} > <span id={"word"+ i} style={{display: "none"}}>{tp.neerlandais}</span><input type="text" name={"input"+i} id= {"input"+ i}/> </td> 
                            <td key = {i + "ovtLine"} className="visible"> {tp.ovt} </td>
                            <td key = {i + "ppLine"} className="visible"> {tp.participePasse} </td> 
                            <td key = {i + "subLine" }className="visible"> <button  key={i +"subbtn"} className="btn btn-block btn-primary " type="submit" value="Submit"  >Submit </button></td>
                        </tr>
                    )
                case 2:
                    return (
                        <tr key = {i}>
                            <td key = {i + "frLine"} className="visible"> {tp.francais} </td>
                            <td key = {i + "nlLine"} className="visible"> {tp.neerlandais} </td> 
                            <td key = {i + "ovtLine"} className="visible"> <span id={"word"+ i} style={{display: "none"}}>{tp.ovt}</span><input type="text" name={"input"+i} id= {"input"+ i}/> </td>
                            <td key = {i + "ppLine"} className="visible"> {tp.participePasse} </td> 
                            <td key = {i + "subLine" }className="visible"> <button  key={i +"subbtn"} className="btn btn-block btn-primary " type="submit" value="Submit"  >Submit </button></td>
                        </tr>
                    )
                case 3:
                    return (
                        <tr key = {i}>
                            <td key = {i + "frLine"} className="visible"> {tp.francais} </td>
                            <td key = {i + "nlLine"} className="visible"> {tp.neerlandais} </td> 
                            <td key = {i + "ovtLine"} className="visible"> {tp.ovt} </td>
                            <td key = {i + "ppLine"} className="visible"> <span id={"word"+ i} style={{display: "none"}}>{tp.participePasse}</span><input type="text" name={i+"trou"} id= {"input"+ i}/>  </td> 
                            <td key = {i + "subLine" }className="visible"> <button  key={i +"subbtn"} className="btn btn-block btn-primary " type="submit" value="Submit"  >Submit </button></td>
                        </tr>
                    )
                default:
                    return (
                        <tr key = {i}>
                            <td key = {i + "frLine"} className="visible"> {tp.francais} </td>
                            <td key = {i + "nlLine"} className="visible"> {tp.neerlandais} </td> 
                            <td key = {i + "ovtLine"} className="visible"> {tp.ovt} </td>
                            <td key = {i + "ppLine"} className="visible"> {tp.participePasse} </td> 
                            <td key = {i + "subLine" }className="visible"> <button  key={i +"subbtn"} className="btn btn-block btn-primary " type="submit" value="Submit"  >Submit </button></td>
                        </tr>
                    )
            }
        })

        return (
            <tbody>{tps}</tbody>
            
        )
    }
}
