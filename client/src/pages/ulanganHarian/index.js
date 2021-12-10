import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

import { getUserById, updateUser } from '../../config/redux/action/setform.js'
// Componnets



import { Button } from '../../components/index.js';
import { Question } from '../../utils/index.js' 

const UlanganHarian = () => {
	const handleRefs = useRef();
	const counDownRef = useRef()
	const [isUser, setIsUser] = useState(null)
	const [indexAnswer, setIndexAnswer] = useState(1)
	const [isQuestion, setIsQuestion] = useState("")
	const [count, setCount] = useState(0)
	const [start, setStart] = useState(false);
	const [finish, setFinish] = useState(false);
	
	useEffect(() => {
		const user = async () => {
			const getUser = await Cookies.get('user');
			if(getUser !== undefined){
				const user = await getUserById('user/dashboard', getUser);
				setIsUser(user.data.data);
			}
		}
		user();
	},[])
	const nextButton = async (e) => {
		
		const elBtn = handleRefs.current.children
		if(e.target.textContent === "Next"){
			if(indexAnswer <= Question.length - 1 && count === 1){
				setIndexAnswer(indexAnswer + 1);
				setCount(0)
				showQuestionAndAnswer(Question[indexAnswer])
				Array.from(elBtn).forEach(el => {
					el.classList.remove('bg-green')
					el.classList.remove('bg-orange')
				})
			} else {
				alert("Pilih jawaban terlebih dahulu sebelum melanjutkannya.")
			}
			if(indexAnswer === Question.length - 1){
				setFinish(true)
			}
		}else if(e.target.textContent === "Submit"){
			submitQuiz()
			
		}
	}
	const submitQuiz = () => {
		const filterPoint = Question.map(data => data.point).filter(data => {
				if(data !== undefined){
					return data
				}
			});
		const finnalScore = (filterPoint.length * 100) / Question.length
		if(isUser !== null){
			isUser.point = finnalScore;
			updateUser(isUser, "", "", isUser._id);
			window.location.assign(`http://localhost:3000/user/dashboard/${isUser.firstName+"_"+isUser.lastName.split(" ").filter(e => e).join("_")}`)
		}
	}
	const showQuestionAndAnswer = (question) => {
		const elBtn = handleRefs.current.children
		setIsQuestion(question.question);
		question.answer.forEach((answer,index) => {
			if(answer.correct){
				elBtn[index].textContent = answer.text
				elBtn[index].dataset.correct = answer.correct
			}else {
				elBtn[index].textContent = answer.text
				elBtn[index].dataset.correct = answer.correct
			}
		})
		
	}
	const startButton = async () => {
		await countDown()
		setStart(true);
		showQuestionAndAnswer(Question[indexAnswer - 1])
	}
	const handleAnswerBtn = (e) => {
		const targetCorrect = e.target.dataset.correct;
		const elBtn = handleRefs.current.children
		
		if(count < 1){
			setCount(count + 1)
			if(targetCorrect === "true"){
				Question[indexAnswer - 1]["point"] = 1
				e.target.classList.add("bg-green");
			} else if(targetCorrect === "false"){
				e.target.classList.add("bg-orange");
				Array.from(elBtn).forEach(el => {
					if(el.dataset.correct === "true"){
						el.classList.add("bg-green")
					}
				});
			}
		}else {
			return null
		}
	}
	
	const countDown = () => {
		let seconds = 59
		let minutes = 2
		const timer = setInterval(() => {
			seconds--
			if(minutes === 0 && seconds === 0){
				clearInterval(timer)
				submitQuiz();
			}
			if(seconds === 0){
				minutes--
				seconds = 60
			}
			counDownRef.current.textContent = minutes + "m " + seconds + "d"
			
		},1000)
		
	}
	return (
	<>
		<div className="h-auto py-14 grid grid-rows-1 items-center">
			<div ref={counDownRef} className="justify-self-center text-5xl font-bold">00:00</div>
			<div className="mt-14 w-11/12 md:w-2/3 mx-auto bg-red-900 p-10 items-center rounded-lg flex justify-center flex-col">
				<div className="question text-white font-bold text-sm md:text-xl">{isQuestion}</div>
				<div className={`answer grid grid-cols-2 gap-5 my-10 ${start ? "block" : "hidden"}`} ref={handleRefs}>
					<Button Stylee={`bg-blue px-5 py-2 text-white text-sm md:text-lg`} onClick={handleAnswerBtn} data-correct=""/>
					<Button Stylee={`bg-blue px-5 py-2 text-white text-sm md:text-lg`} onClick={handleAnswerBtn} data-correct=""/>
					<Button Stylee={`bg-blue px-5 py-2 text-white text-sm md:text-lg`} onClick={handleAnswerBtn} data-correct=""/>
					<Button Stylee={`bg-blue px-5 py-2 text-white text-sm md:text-lg`} onClick={handleAnswerBtn} data-correct=""/>
				</div>
				<div className={` ${start ? "block" :"hidden"}`}>
					<Button type="submit" title={finish ? "Submit" : "Next"} Stylee="font-bold bg-yellow p-4 px-14" onClick={nextButton}/>
					
				</div>
				<div className={`${start ? "hidden" : "block"}`}>
					<Button title="Start" Stylee=" bg-yellow p-5 px-14 font-bold" onClick={startButton}/>
				</div>
				
			</div>
		</div>
	</>
	)
}

export default UlanganHarian