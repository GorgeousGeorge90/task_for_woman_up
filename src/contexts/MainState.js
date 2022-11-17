import {MainContext} from './MainContext';

const MainState = ({children})=> {

    return (
        <MainContext.Provider>
            {children}
        </MainContext.Provider>
    )
}

export default MainState