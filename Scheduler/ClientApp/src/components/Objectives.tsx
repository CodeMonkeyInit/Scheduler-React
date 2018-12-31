import {Component, ReactNode} from "react";
import {Objective} from "../classes/objective";
import {connect, Connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {actionCreators} from "../store/Objectives";
import React from 'react';

interface ObjectiveProperties{
    getAll(): void;
    objectives: Objective[];
}

class Objectives extends Component<ObjectiveProperties>{
    
    componentWillMount(): void {
        this.props.getAll();
    }


    getObjectives(){
        return this.props.objectives.map(objective => (
           <div key={objective.id}>
               <h3>{objective.description}</h3>
           </div> 
        ));
    }
    
    render(): ReactNode {
        return(
            this.getObjectives()
        );
    }
}

export default connect(
    (state: any) => ({ objectives: state.objectives }) ,
    (dispatch: Dispatch<Objective[]>) => bindActionCreators(actionCreators, dispatch),
    
)(Objectives);