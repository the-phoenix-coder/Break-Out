const score = document.querySelector('.score')
const container = document.querySelector('.container')

const width = 100
const height = 20


let x = -2
let y = 2


const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let currentBall = ballStart

let timer
const containerWidth = 560
const containerHeight = 300
const ballD = 20
let result = 0

class Block {
	constructor(xAxis,yAxis) {
		this.bottomLeft = [xAxis, yAxis]
		this.bottomRight = [xAxis + width, yAxis]
		this.topLeft = [xAxis, yAxis + height]
		this.topRight = [xAxis + width, yAxis + height]
	}
}

const blocks = 
[
	new Block(10, 270),
	new Block(120, 270),
	new Block(230, 270),
	new Block(340, 270),
	new Block(450, 270),
	new Block(10, 240),
	new Block(120, 240),
	new Block(230, 240),
	new Block(340, 240),
	new Block(450, 240),
	new Block(10, 210),
	new Block(120, 210),
	new Block(230, 210),
	new Block(340, 210),
	new Block(450, 210),
]

function createBlocks() {
	for(let i = 0; i < blocks.length; i++) {
		const block = document.createElement('div')
		block.classList.add('block')
		block.style.left = blocks[i].bottomLeft[0] + 'px'
		block.style.bottom = blocks[i].bottomLeft[1] + 'px'
		container.append(block)
	}
}

createBlocks()

const user = document.createElement('div')
user.classList.add('user')
userPosition()
user.style.backgroundColor = 'purple'
container.append(user)

function userPosition() {
	user.style.left = currentPosition[0] + 'px'
	user.style.bottom = currentPosition[1] + 'px'
}

function ballPosition() {
	ball.style.left = currentBall[0] + 'px'
	ball.style.bottom = currentBall[1] + 'px'
}

function moveUser(e) {
	switch(e.key) {
		case 'ArrowLeft':
			if(currentPosition[0] > 0) {
				currentPosition[0] -= 10
				userPosition()
			}
			break;

		case 'ArrowRight':
			if(currentPosition[0] < 460) {
				currentPosition[0] += 10
				userPosition()
			}
	}
}

document.addEventListener('keydown', moveUser)

const ball = document.createElement('div')
ball.classList.add('ball')
container.append(ball)

function moveBall() {
		currentBall[0] += x
		currentBall[1] += y
		ballPosition()
		checkBall()
}
timer = setInterval(moveBall, 25)

function checkBall() {

	for(let i = 0; i < blocks.length; i++) {
		if((currentBall[0] > blocks[i].bottomLeft[0] && currentBall[0] < blocks[i].bottomRight[0]) && 
			(currentBall[1] > blocks[i].bottomLeft[1] && currentBall[1] < blocks[i].topLeft[1])
		) {
			const Allblocks = Array.from(document.querySelectorAll('.block'))
			Allblocks[i].classList.remove('block')
			blocks.splice(i, 1)
			changeDirection()
			result++
			score.innerHTML = result
			if(blocks.length === 0) {
				swal.fire('Congratulation','You Won')
				result.innerHTML = 'You Won'
				clearInterval(timer)
				document.removeEventListener('keydown', moveUser)
			}
		}
	}

	if(
		currentBall[0] >= containerWidth - ballD ||
		currentBall[1] >= containerHeight - ballD ||
		currentBall[0] <= 0
		) {
		changeDirection()
	}
	if(
		currentBall[0] > currentPosition[0] && currentBall[0] < currentPosition[0] + width&&
		currentBall[1] > currentPosition[1] && currentBall[1] < currentPosition[1] + height
	) {
		changeDirection()
	}
	if(currentBall[1] <= 0) {
		clearInterval(timer)
		Swal.fire(
			{
				text:'Game Over'
			}
		)
			document.removeEventListener('keydown', moveUser)
			score.textContent = 'You Hava Lost'
	}
}

function changeDirection() {
	if(x === 2 && y === 2) {
		y = -2
		return 
	}
	if(x === 2 && y === -2) {
		x = -2
		return
	}
	if(x === -2 && y === -2) {
		y = 2
		return 
	}
	if(x === -2 && y === 2) {
		x = 2
		return 
	}
}