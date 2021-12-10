import React from 'react';


// Components 
import { List } from '..';
const ListMenu = ({value = "none", Stylee, isStyle, array = [], arrayForMobile = [], sizeWindow, ...rest}) => {
    if(arrayForMobile.length !== 0){
        array = []
    }
    // useEffect(() => {
        // if(arrayForMobile.length !== 0){
            // array = []
        // }
    // }, [arrayForMobile])
    return (
        <>
            <div>
                <ul className={isStyle} >
                    {
                        array.length !== 0 
                        ?
                        array.map((data, index) => {
                            return (
                                <>
                                <li className="sm:block hidden" key={index}>
                                    <List {...rest} name={data} Stylee={value} isStyle={`cursor-pointer ${value === data ? Stylee : "p-2"}`} />
                                </li>
                                </>
                            )
                        })
                        : null
                    }
                    {
                        arrayForMobile.length !== 0
                        ?
                        arrayForMobile.map((data, index) => {
                            return (
                                <>
                                    <li className="block sm:hidden cursor-pointer " key={index}>
                                        <List {...rest} mobileStyle={`${value === index.toString() ? Stylee: "p-2"}`}id={index} sizeScreen={sizeWindow} onlyMobile={true} mobileMenu={data} key={index}/>
                                    </li>
                                </>
                            )
                            
                        })
                        : null
                    }
                </ul>
            </div>
        </>
    )
}

export default ListMenu