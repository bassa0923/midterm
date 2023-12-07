import Select from 'react-select';


function Location( props ) {
    return(
        <>
         <Select className='selector-manufactor' options={props.location} onChange={props.locationChange} isMulti placeholder='მდებარეობა'/>
        </>
    )
}



export default Location