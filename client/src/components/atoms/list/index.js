import React from 'react';


import { Gap, Input, Image } from '..';
const List = ({mobileStyle,sizeScreen,onlyMobile = false, mobileMenu ,name,label,forhtml, tf,Stylee, isStyle,  ...rest}) => {
    
    return(
        <>
            <div className="flex ">
                <label htmlFor={forhtml} className={Stylee}>
                    <span className="text-xl">{label}</span>
                </label>
                <Gap WH="w-5"/>
                {
                    tf ? <Input value={name} placeholder={name} type="text" {...rest} /> : <span {...rest} className={`block text-xl ${isStyle}`}>{name}</span>
                        
                }
               
                
            </div>
            
            {
                sizeScreen <= 640 && onlyMobile
                ?<div className={`block sm:hidden ${mobileStyle}`}>
                    <Image src={mobileMenu} {...rest} alt="Icon untuk list menu" Stylee="w-14 sm:hidden block "/>
                </div>
                : null
            }
            
        </>
    )
}



export default List