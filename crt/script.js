let currentQuestion = 0;  

const questionImage = document.getElementById('question-image');
const answerImage = document.getElementById('Answer-image');    
const nextBtn = document.getElementById('next-btn');  
  
function loadQuestion(index) {  
    // const question = questions[index];  
    answerImage.src = 'assets/{}_answer.png'.replace('{}', index + 1);
    questionImage.src = 'assets/{}_question.png'.replace('{}', index + 1);
}
  
loadQuestion(currentQuestion); // 加载第一题  
  
nextBtn.addEventListener('click', () => {  
    loadQuestion(++currentQuestion);  
    if (currentQuestion >= 72) {  
        alert('Quiz Completed!');  
        currentQuestion = 0; // 重置或进行其他操作  
    }  
});

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
        alert('1 选项被点击 test');  
    } else if (row==0 && col==1) {
        alert('2 选项被点击');  
    } else if (row==0 && col==2) {
        alert('3 选项被点击');  
    } else if (row==1 && col==0) {
        alert('4 选项被点击');  
    } else if (row==1 && col==1) {
        alert('5 选项被点击');  
    } else if (row==1 && col==2) {
        alert('6 选项被点击');  
    } else if (row==0 && col==3) {
        alert('1 选项被点击 test');  
    } else if (row==0 && col==4) {
        alert('2 选项被点击');  
    } else if (row==0 && col==5) {
        alert('3 选项被点击');  
    } else if (row==0 && col==6) {
        alert('4 选项被点击');  
    } else if (row==1 && col==3) {
        alert('5 选项被点击');  
    } else if (row==1 && col==4) {
        alert('6 选项被点击');  
    } else if (row==1 && col==5) {
        alert('7 选项被点击');  
    } else if (row==1 && col==6) {
        alert('8 选项被点击');  
    }
    nextBtn.click();
});
