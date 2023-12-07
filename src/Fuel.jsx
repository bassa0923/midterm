import Select from 'react-select';


function Fuel( props ){
    return(
        <>
        <Select className='selector-manufactor' options={props.fuel} onChange={props.fuelChange} isMulti placeholder='საწვავი'/>
       </>
    )
}


export default Fuel;