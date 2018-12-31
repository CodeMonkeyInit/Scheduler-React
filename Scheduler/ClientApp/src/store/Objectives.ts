import {AnyAction, Dispatch} from "redux";
import {Objective} from "../classes/objective";

const apiPath = "api/Scheduler";

const initialState: Objective[] = [];

export enum ObjectivesActions {
    GetAll,
    Add,
    Remove,
    Update
}

export const actionCreators = {
    getAll: () => async (dispatch: Dispatch<Objective[]>) => {
        let response = await fetch(apiPath);

        let objectives = (await response.json()) as Objective[];

        dispatch({type: ObjectivesActions.GetAll, payload: objectives});
    },
    add: (objective: Objective) => async (dispatch: Dispatch<Objective>) =>{
        let response = await fetch(apiPath, {
            method: "POST",
            body: JSON.stringify(objective),
            headers: {
                'content-type': 'application/json'
            }
        });

        let addedPost = (await response.json()) as Objective;

        dispatch({type: ObjectivesActions.Update, payload: addedPost});
    },
    remove: (objective: Objective) => async (dispatch: Dispatch<number>) => {
        let response = await fetch(apiPath, {
            method: "DELETE",
            body: JSON.stringify(objective),
            headers: {
                'content-type': 'application/json'
            }
        });

        let deletedPostId = (await response.json()) as number;

        dispatch({type: ObjectivesActions.Remove, payload: deletedPostId});
    },
    update: (objective: Objective) => async (dispatch: Dispatch<Object>) => {
        let response = await fetch(apiPath, {
            method: "PUT",
            body: JSON.stringify(objective),
            headers: {
                'content-type': 'application/json'
            }
        });
        
        let updatedPost = (await response.json()) as Objective;
        
        dispatch({type: ObjectivesActions.Update, payload: updatedPost});
    }
};

export const reducer = (state = initialState, action: AnyAction): Objective[] => {
    switch (action.type){
        case ObjectivesActions.GetAll:
            return action.payload;
        case ObjectivesActions.Remove:
            let removedObjectiveId = action.payload;
            
            return state.filter(objective => objective.id != removedObjectiveId);
        case ObjectivesActions.Update:
            let updatedObjective = action.payload as Objective;

            let oldObjectives = state.filter(objective => objective.id != updatedObjective.id);

            return [updatedObjective, ...oldObjectives];
            
        case ObjectivesActions.Add:
            return [action.payload, ...state];
        default:
            return state;
    }
};

