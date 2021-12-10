import React from 'react';


import { Input, Button, Gap } from '../../components/index.js'
const Bayaran = () => {
	const myClass = ["10 Akutansi", "11 Akutansi", "12 Akutansi", "10 Pemasaran", "11 Pemasaran", "12 Pemasaran", "10 AP", "11 AP", "12 AP"]
	return (
		<>
			<div className="py-10">
				<div className="bg-white w-1/2 rounded-lg shadow-lg p-4 mx-auto py-5">
					<form method="POST">
						<ul>
							<li>
								<Input type="text" ph="Masukkan Nama Anda" id="name" htmlfor="name" label="FullName:"/>
							</li>
							<Gap WH="h-5" />
							<li>
								<Input type="email" ph="Masukkan Email Anda" id="email" htmlfor="email" label="Email:"/>
							</li>
							<Gap WH="h-5" />
							<li className="relative">
								<span className="absolute bottom-5 left-5">RP.</span><Input type="number" ph="Masukkan Nominal Pembayaran" id="number" htmlfor="number" label="Total Bayaran:" isStyle="pl-10"/>
							</li>
							<Gap WH="h-5" />
							<li className="grid grid-cols-3">
								{
									myClass.map(data => {
										return <Input type="radio" label={data} id={data} htmlfor={data} value={data} Stylee="w-30" isStyle="w-1/2 outline-none focus:outline-none radios-none" name="Kelas:" />
									})
								}
							</li>
							<Gap WH="h-5" />
							<li>
								<Input type="file" label="Bukti Pembayaran:" id="pembayaran" htmlfor="pembayaran"/>
							</li>
							<Gap WH="h-5" />
						</ul>
						<Button type="submit" title="Bayar" Stylee="bg-blue-500"/>
					</form>
				</div>
			</div>
		</>
	)
}

export default Bayaran