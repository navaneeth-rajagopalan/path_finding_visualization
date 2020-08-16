import React, { Component } from 'react';
import classes from './Node.module.css';

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render (){
        const appliedClasses = [classes.Node];
        if(this.props.isStartNode){
            appliedClasses.push(classes.Start);
        }
        if(this.props.isTargetNode){
            appliedClasses.push(classes.Target);
        }
        if(this.props.visited){
            appliedClasses.push(classes.Visited);
        }
        if(this.props.isInPath){
            appliedClasses.push(classes.Path);
        }
        return (
            <div className={appliedClasses.join(' ')}>
            </div>
        );
    }
}

export default Node ;