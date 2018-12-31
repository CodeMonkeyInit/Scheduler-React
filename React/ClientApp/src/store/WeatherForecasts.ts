import {AnyAction, Dispatch} from "redux";

const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = {forecasts: [], isLoading: false};

export const actionCreators = {
    //TODO replace generic with proper typing
    requestWeatherForecasts: (startDateIndex: number) => async (dispatch: Dispatch<object>, getState: () => any) => {
        if (startDateIndex === getState().weatherForecasts.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({type: requestWeatherForecastsType, startDateIndex});

        const url = `api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`;
        const response = await fetch(url);
        const forecasts = await response.json();

        dispatch({type: receiveWeatherForecastsType, startDateIndex, forecasts});
    }
};

export const reducer = (state = initialState, action: AnyAction) => {

    switch (action.type) {
        case requestWeatherForecastsType:
            return {
                ...state,
                startDateIndex: action.startDateIndex,
                isLoading: true
            };
        case receiveWeatherForecastsType:
            return {
                ...state,
                startDateIndex: action.startDateIndex,
                forecasts: action.forecasts,
                isLoading: false
            };
        default:
            return state;
    }
};
