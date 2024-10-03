let currentQuestion = 0;  

let answers = [
    4, 5, 1, 2, 6, 3, 6, 2, 1, 3, 4, 5,
    4, 5, 1, 6, 2, 1, 3, 4, 6, 3, 5, 2,
    2, 6, 1, 2, 1, 3, 5, 6, 4, 3, 4, 5,
    8, 2, 3, 8, 7, 4, 5, 1, 7, 6, 1, 2,
    3, 4, 3, 7, 8, 6, 5, 4, 1, 2, 5, 6,
    7, 6, 8, 2, 1, 5, 1, 6, 3, 2, 4, 5
];

let is_pre_question = 1; //0 for official question, 1,2,3... for pre-question

let answered = new Array(72).fill(0);
let jumped = new Array(72).fill(0);
let corrects = new Array(72).fill(0);

const questionImage = document.getElementById('question-image');
const answerImage = document.getElementById('Answer-image');    
const nextBtn = document.getElementById('next-btn'); 
const prevBtn = document.getElementById('prev-btn'); 
const counter = document.getElementById('counter'); 
  
function loadQuestion(index) {
    if (is_pre_question>0) {
        index = is_pre_question-1;
        answerImage.src = 'assets/{}_answer.png'.replace('{}', index + 1);
        questionImage.src = 'assets/{}_question.png'.replace('{}', index + 1);
        counter.innerText = '试做题目{}'.replace('{}', index + 1);
        return;
    }

    // const question = questions[index];  
    answerImage.src = 'assets/{}_answer.png'.replace('{}', index + 1);
    questionImage.src = 'assets/{}_question.png'.replace('{}', index + 1);
    counter.innerText = '题目{}/72'.replace('{}', index + 1);
    if (answered[index] != 0) {
        nextBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'none';
    }
}

questionImage.style.display = 'none';
answerImage.style.display = 'none';
nextBtn.style.display = 'none';
prevBtn.style.display = 'none';
counter.style.display = 'none';
function submitForm() {
    var name = document.getElementById("name").value;
    var gender = document.getElementById("gender").value;
    var birthday = document.getElementById("birthday").value;
    
    alert("Name: " + name + "\nGender: " + gender + "\nBirthday: " + birthday);

    document.getElementById('personalInfoForm').style.display = 'none';
    counter.style.display = 'block';
    counter.innerText = '首先是试做部分，这个页面需要写点什么提示呢？';
    nextBtn.style.display = 'block';
    nextBtn.innerText = '开始试做';
}

// loadQuestion(currentQuestion); // 加载第一题  
  
nextBtn.addEventListener('click', () => {

    if (nextBtn.innerText == '开始试做') {
        nextBtn.innerText == '下一题';
        nextBtn.style.display = 'none';
        questionImage.style.display = 'block';
        answerImage.style.display = 'block';
        loadQuestion(currentQuestion);
        return;
    } else if (nextBtn.innerText == '开始答题') {
        nextBtn.innerText = '下一题';
        questionImage.style.display = 'block';
        answerImage.style.display = 'block';
        nextBtn.style.display = 'block';
        prevBtn.style.display = 'block';
        is_pre_question = 0;
        loadQuestion(currentQuestion);
        return;
    }

    currentQuestion++;
    while (currentQuestion <= 71 && jumped[currentQuestion] == 1) {
        // console.log(currentQuestion);
        currentQuestion++;
    }

    if (currentQuestion > 71) {  
        let final_score = 0;
        for (let i = 0; i <= 71; i++) {
            final_score += corrects[i]*(1-jumped[i]);
        }
        // alert('Quiz Completed! Score: ' + final_score + '/72');
        questionImage.style.display = 'none';
        answerImage.style.display = 'none';
        nextBtn.style.display = 'none';
        prevBtn.style.display = 'none';
        counter.innerText = '测试完成，您的得分为 {} 分。\n您可以退出测试网页了。'.replace('{}', final_score);
        return;
    }
    loadQuestion(currentQuestion); 
});

prevBtn.addEventListener('click', () => {
    currentQuestion--;
    while (currentQuestion >= 71 && jumped[currentQuestion] == 1) {
        currentQuestion--;
    }
    if (currentQuestion < 0) {
        alert('已经是第一题了');
        currentQuestion = 0;
        return;
    }  
    loadQuestion(currentQuestion);
});

function checkAnswer(answer) {

    if (is_pre_question>0) {
        if (answers[is_pre_question-1] != answer) {
            alert("试做题回答错误，请再次尝试。");
            return;
        } else {
            if (is_pre_question == 3) {
                counter.innerText = '试做部分完成，接下来是正式测试部分。';
                nextBtn.innerText = '开始答题';
                nextBtn.style.display = 'block';
                questionImage.style.display = 'none';
                answerImage.style.display = 'none';

            } else {
                is_pre_question++;
                loadQuestion(currentQuestion);
            }
            return;
        }
    }

    answered[currentQuestion] = answer;
    if (answer === answers[currentQuestion]) {  
        corrects[currentQuestion] = 1; 
    }
    let stage = Math.floor(currentQuestion / 12);
    if (stage >= 3) { 
        let adja_errors = 0;
        for (let i = Math.floor(currentQuestion / 12)*12; i < Math.min(Math.floor(currentQuestion / 12)*12+12, 72); i++) {
            jumped[i] = 0;
        }
        for (let i = Math.floor(currentQuestion / 12)*12; i <= currentQuestion; i++) {
            if (corrects[i] == 0) {
                adja_errors++;
            } else {
                adja_errors = 0;
            }
            if (adja_errors >= 3) {
                alert("jump!");
                for (let j = currentQuestion+1; j < Math.min(Math.floor(currentQuestion / 12)*12+12, 72); j++) {
                    jumped[j] = 1;
                }
                break;
            }
        }
    }
}


document.getElementById('image-container').addEventListener('click', function(event) {  
    const img = document.getElementById('Answer-image');  
    const rect = img.getBoundingClientRect();  
  
    // 计算点击位置相对于图片的坐标  
    const x = (event.clientX - rect.left)*238/rect.height;  
    const y = (event.clientY - rect.top)*238/rect.height; 

    let row = 0;
    // [412, 506, 554, 650]
    if (y<=506-412) {
        row = 0;
    } else if (y>=554-412 && y<=650-412) {
        row = 1;
    } else {
        return;
    }

    let col = 0;
    if (currentQuestion<36) {
        // [161, 317, 409, 565, 662, 818]
        if (x<=317-161) {
            col = 0;
        } else if (x>=409-161 && x<=565-161) {
            col = 1;
        } else if (x>=662-161) {
            col = 2;
        } else {
            return;
        }
    } else {
        // [113, 269, 313, 469, 502, 658, 739, 895]
        if (x<=269-113) {
            col = 3;
        } else if (x>=313-113 && x<=469-113) {
            col = 4;
        } else if (x>=502-113 && x<=658-113) {
            col = 5;
        } else if (x>=739-113) {
            col = 6;
        } else {
            return;
        }
    }

    if (row==0 && col==0) {
        checkAnswer(1);  
    } else if (row==0 && col==1) {
        checkAnswer(2); 
    } else if (row==0 && col==2) {
        checkAnswer(3);
    } else if (row==1 && col==0) {
        checkAnswer(4);  
    } else if (row==1 && col==1) {
        checkAnswer(5);  
    } else if (row==1 && col==2) {
        checkAnswer(6);  
    } else if (row==0 && col==3) {
        checkAnswer(1); 
    } else if (row==0 && col==4) {
        checkAnswer(2);  
    } else if (row==0 && col==5) {
        checkAnswer(3);
    } else if (row==0 && col==6) {
        checkAnswer(4);  
    } else if (row==1 && col==3) {
        checkAnswer(5);  
    } else if (row==1 && col==4) {
        checkAnswer(6);  
    } else if (row==1 && col==5) {
        checkAnswer(7);  
    } else if (row==1 && col==6) {
        checkAnswer(8);  
    }
    if (nextBtn.innerText != '开始答题') {
        nextBtn.click();
    }
});
