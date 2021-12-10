import React from 'react';

const Input = ({htmlfor, isStyle,label,id,type,ph,Stylee,myStyle,...rest}) => {
    return (
        <>
            <div className={`flex flex-col ${myStyle}`}>
                <label htmlFor={htmlfor} className={Stylee}>
                    <span className="text-lg font-semibold">{label}</span>
                </label>
                <input type={type} placeholder={ph} id={id} {...rest} class={`w-60 p-2 rounded-full pl-4 outline-none focus:ring-4 my-2 border-4 focus:border-opacity-0 ${isStyle} ${id === "kelas" ? "hidden" : "block"}`} />
                <select name={type} id={id} className={id !== "kelas" ?"hidden" : "block"} {...rest}>
                    <option value="10 Akutansi">10 Akutansi</option>
                    <option value="11 Akutansi">11 Akutansi</option>
                    <option value="12 Akutansi">12 Akutansi</option>
                    <option value="10 Pemasaran">10 Pemasaran</option>
                    <option value="11 Pemasaran">11 Pemasaran</option>
                    <option value="12 Pemasaran">12 Pemasaran</option>
                    <option value="10 AP">10 AP</option>
                    <option value="11 AP">11 AP</option>
                    <option value="12 AP">12 AP</option>
                </select>
            </div>
        </>
    )
}

export default Input