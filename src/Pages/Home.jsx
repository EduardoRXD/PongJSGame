import { useRef, useEffect, useState } from "react"
import LevelSelector from "../Components/LevelSelector";

function Home() {
    const ref = useRef()

    const [level, setLevel] = useState(0)

    function HandleClick(value) {
        setLevel(value)
    }

    const canvasWidth = 900;
    const canvasHeight = 600;
    const paddleHeight = canvasHeight * 0.25;
    const paddleWidth = canvasWidth * 0.05;

    const paddleSpeed = 8

    let ballX = canvasWidth / 2
    let ballY = canvasHeight / 2

    let ballSpeed = 4

    let dir1 = 1
    let dir2 = 1

    const [score, setScore] = useState([0, 0])

    const keysPressed = {}

    let paddle1Y = canvasHeight / 2 - paddleHeight / 2
    let paddle2Y = canvasHeight / 2 - paddleHeight / 2

    useEffect(() => {
        const canvas = ref.current;
        const context = canvas.getContext('2d')

        function drawBall() {
            context.fillStyle = "black";
            context.beginPath();
            context.arc(ballX, ballY, 15, 0, Math.PI * 2, true);
            context.fill()
            context.stroke();
        }

        function draw() {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.fillStyle = "green";
            context.fillRect(canvasWidth * 0.02, paddle1Y, paddleWidth, paddleHeight);

            context.fillStyle = "blue";
            context.fillRect(canvasWidth - canvasWidth * 0.02 - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

            drawBall()
        }

        function ballTrajectory() {
            ballX += ballSpeed * dir1;
            ballY += ballSpeed * dir2;

            if (ballY - 15 <= 0) {
                dir2 = -dir2;
            }

            if (ballY + 15 >= canvasHeight) {
                dir2 = -dir2;
            }

            if (ballX - 15 <= 0) {
                dir1 = -dir1;
                setScore(prev => [prev[0] + 1, prev[1]]);
                ballSpeed = 4
                ballX = canvasWidth / 2
                ballY = canvasHeight / 2
            }


            if (ballX + 15 >= canvasWidth) {
                dir1 = -dir1;
                setScore(prev => [prev[0], prev[1] + 1]);
                ballSpeed = 4
                ballX = canvasWidth / 2
                ballY = canvasHeight / 2
            }

            if (ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight && ballX <= canvasWidth * 0.02 + paddleWidth + 15 && dir1 == -1) {
                dir1 = -dir1;
                ballSpeed += ballSpeed * .20
            }

            if (ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight && ballX >= canvasWidth - paddleWidth - canvasWidth * 0.02 - 15 && dir1 == 1) {
                dir1 = -dir1;
                ballSpeed += ballSpeed * .20
            }
        }

        const levels = [
            function level1() {
                if (keysPressed["w"]) {
                    paddle1Y = Math.max(paddle1Y - paddleSpeed, 0);
                }
                if (keysPressed["s"]) {
                    paddle1Y = Math.min(paddle1Y + paddleSpeed, canvasHeight - paddleHeight);
                }

                if (keysPressed["ArrowUp"]) {
                    paddle2Y = Math.max(paddle2Y - paddleSpeed, 0);
                }
                if (keysPressed["ArrowDown"]) {
                    paddle2Y = Math.min(paddle2Y + paddleSpeed, canvasHeight - paddleHeight);
                }

                ballTrajectory()
                draw();
                requestAnimationFrame(level1);
            },

            [
                function level2Easy() {
                    if (keysPressed["w"]) {
                        paddle1Y = Math.max(paddle1Y - paddleSpeed, 0);
                    }
                    if (keysPressed["s"]) {
                        paddle1Y = Math.min(paddle1Y + paddleSpeed, canvasHeight - paddleHeight);
                    }

                    if (paddle2Y + paddleHeight / 2 > ballY) {
                        paddle2Y -= 8
                    } else {
                        paddle2Y += 8
                    }

                    ballTrajectory()
                    draw()
                    requestAnimationFrame(level2Easy)
                },

                function level2Normal() {
                    if (keysPressed["w"]) {
                        paddle1Y = Math.max(paddle1Y - paddleSpeed, 0);
                    }
                    if (keysPressed["s"]) {
                        paddle1Y = Math.min(paddle1Y + paddleSpeed, canvasHeight - paddleHeight);
                    }

                    if (paddle2Y + paddleHeight / 2 > ballY) {
                        paddle2Y -= 8
                    } else {
                        paddle2Y += 8
                    }

                    ballTrajectory()
                    draw()
                    requestAnimationFrame(level2Normal)
                },

                function level2Hard() {
                    if (keysPressed["w"]) {
                        paddle1Y = Math.max(paddle1Y - paddleSpeed, 0);
                    }
                    if (keysPressed["s"]) {
                        paddle1Y = Math.min(paddle1Y + paddleSpeed, canvasHeight - paddleHeight);
                    }

                    if (paddle2Y + paddleHeight / 2 > ballY) {
                        paddle2Y -= 8
                    } else {
                        paddle2Y += 8
                    }

                    ballTrajectory()
                    draw()
                    requestAnimationFrame(level2Hard)
                }
            ],
        ]

        function handleKeyDown(event) {
            keysPressed[event.key] = true;
        }

        function handleKeyUp(event) {
            keysPressed[event.key] = false;
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        draw()

        if (level.length > 0) {
            if (level.length > 1) {
                levels[level[0]][level[1]]()
            } else {
                levels[level[0]]()
            }
        }

        return () => { window.removeEventListener("keydown", handleKeyDown); window.removeEventListener("keyup", handleKeyUp) };
    }, [level])

    return <>
        <LevelSelector onClick={HandleClick}></LevelSelector>
        <h1 style={{ textAlign: "center", paddingTop: "60px" }}>SCORE: {score[1]} X {score[0]}</h1>
        <div style={{ maxWidth: "1280px", paddingTop: "60px", margin: "0 auto", display: "flex", justifyContent: "center" }}>
            <canvas ref={ref} width={canvasWidth} height={canvasHeight} style={{ borderWidth: "1px", borderColor: "rgb(89,17,148)", borderStyle: "solid" }}></canvas>
        </div>
    </>
}

export default Home