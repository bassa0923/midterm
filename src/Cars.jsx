import Select from 'react-select';


function Cars( props ) {
    return(
        <>
         <Select className='selector-manufactor' options={props.carName} onChange={props.handleChange} isMulti placeholder='მწარმოებელი'/>
        </>
        
    )
}


export default Cars