import loader from './../../assets/img/loader2.svg'

/**
 * Компонент вовзращающий прелоадер
 *
 * @return {JSX.Element}
 * @constructor
 */

const Preloader = () => {
    return (
        <>
            <img src={loader}/>
        </>
    )
}

export default Preloader