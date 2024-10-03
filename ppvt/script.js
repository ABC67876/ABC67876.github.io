let currentQuestion = 0; 


let answers = [  
    4, 3, 1, 1, 4, 2, 2, 1,   
    4, 2, 3, 4, 4, 2, 2, 1,   
    4, 1, 1, 1, 3, 3, 1, 3,   
    4, 1, 4, 2, 4, 2, 1, 3,   
    2, 3, 1, 1, 4, 4,
    4, 4, 2, 1, 2, 1, 3, 3, 3,   
    2, 1, 4, 4, 2, 2, 4, 3, 3, 3,   
    2, 1, 2, 1, 3, 1, 1, 1, 2,   
    4, 2, 3, 4, 4, 2, 3, 2, 4, 4,
    2, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1,   
    4, 1, 1, 3, 3, 4, 1, 1, 1, 2,   
    3, 3, 1, 3, 3, 1, 2, 3, 1, 3,   
    2, 1, 3, 2, 1, 4, 4,
    3, 3, 3, 2, 2, 2
];

let corrects = new Array(120).fill(0);  

let is_pre_question = 1; //0 for official question, 1,2,3... for pre-question

const audioPlayer = document.getElementById('audio-player');
const replayBtn = document.getElementById('replay-btn');
const questionImage = document.getElementById('question-image');  
const nextBtn = document.getElementById('next-btn');  
const counter = document.getElementById('counter'); 
nextBtn.style.display = 'none';

var needplaytwice = 0;
audioPlayer.addEventListener('ended', function() {  
    if (needplaytwice == 1) {
        needplaytwice = 0;
        replayBtn.click();
    }
});

function loadQuestion(index) {
    if (index >= 120) {
        return;
    }
    replayBtn.style.display = 'block';
    nextBtn.style.display = 'none';
    if (is_pre_question>0) {
        index = is_pre_question-1;
        needplaytwice = 1;
        audioPlayer.src = 'assets/audios/{}.wav'.replace('{}', index + 1);  
        questionImage.src = 'assets/images/{}.png'.replace('{}', index + 1);
        counter.innerText = '试做题目{}'.replace('{}', index + 1);
        return;
    }

    needplaytwice = 1;
    audioPlayer.src = 'assets/audios/{}.wav'.replace('{}', index + 1);  
    questionImage.src = 'assets/images/{}.png'.replace('{}', index + 1);
    counter.innerText = '题目{}/120'.replace('{}', index + 1);
}  

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
                replayBtn.style.display = 'none';

            } else {
                is_pre_question++;
                loadQuestion(currentQuestion);
            }
            return;
        }
    }

    if (answer === answers[currentQuestion]) {  
        corrects[currentQuestion] = 1;  
    }
    let end = false;
    if (currentQuestion>=7) {
        let sum = 0;
        for (let i = currentQuestion-7; i <= currentQuestion; i++) {  
            sum += corrects[i];  
        }
        if (sum <= 2) {  
            end = true;
        }
    }
    if (end || currentQuestion >= 119) {
        let sum = 0;
        for (let i = 0; i <= currentQuestion; i++) {  
            sum += corrects[i];  
        }
        // alert('Correct: ' + sum + '/120');
        questionImage.style.display = 'none';
        replayBtn.style.display = 'none';
        counter.innerText = '测试完成，您的得分为 {} 分。\n您可以退出测试网页了。'.replace('{}', sum);
        currentQuestion = 120;
        return;
    }
}
  
questionImage.style.display = 'none';
nextBtn.style.display = 'none';
replayBtn.style.display = 'none';
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


nextBtn.addEventListener('click', () => {
    if (nextBtn.innerText == '开始试做') {
        nextBtn.innerText == '下一题';
        nextBtn.style.display = 'none';
        questionImage.style.display = 'block';
        loadQuestion(currentQuestion);
        return;
    } else if (nextBtn.innerText == '开始答题') {
        nextBtn.innerText = '下一题';
        questionImage.style.display = 'block';
        nextBtn.style.display = 'none';
        is_pre_question = 0;
        loadQuestion(currentQuestion);
        return;
    }
    
    loadQuestion(++currentQuestion);
    if (currentQuestion >= questions.length) {  
        // alert('Quiz Completed!');  
        // currentQuestion = 0; // 重置或进行其他操作
        return; 
    }  
});

replayBtn.addEventListener('click', function() {  
    // 停止并重置音频（如果需要）  
    audioPlayer.pause();  
    audioPlayer.currentTime = 0; // 将播放位置重置为开头  
    // 播放音频（如果之前移除了autoplay）  
    audioPlayer.play();  
});

document.getElementById('image-container').addEventListener('click', function(event) {  
    const img = document.getElementById('question-image');  
    const rect = img.getBoundingClientRect();  
  
    // 计算点击位置相对于图片的坐标  
    const x = event.clientX - rect.left;  
    const y = event.clientY - rect.top;  
  
    // 假设图片宽高都是固定的，这里以300x200为例  
    const width = rect.width;  
    const height = rect.height;  
  
    // 划分区域  
    if (x < width / 2 && y < height / 2) {  
        // 左上角区域（A选项）  
        // alert('A选项被点击');
        checkAnswer(1);
        // 执行A选项的逻辑  
    } else if (x >= width / 2 && y < height / 2) {  
        // 右上角区域（B选项）  
        // alert('B选项被点击');
        checkAnswer(2);
        // 执行B选项的逻辑  
    } else if (x < width / 2 && y >= height / 2) {  
        // 左下角区域  
        // alert('C选项被点击');
        checkAnswer(3);
        // 可以根据需要添加逻辑  
    } else {  
        // 右下角区域  
        // alert('D选项被点击');
        checkAnswer(4);
        // 可以根据需要添加逻辑  
    }
    if (nextBtn.innerText != '开始答题') {
        nextBtn.click();
    }
});