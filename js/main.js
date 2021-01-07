'use strict'

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '飛行機で食べられるように作られた野菜があります。その野菜はどれでしょう？', c: ['ミニトマト', 'パプリカ', 'アボカド', 'ズッキーニ']},
    {q: '大根おろしはあるすり方をすると、辛くなります。そのすり方とはなんでしょう？', c: ['早くする', 'ゆっくりする', '力を込めてする', '力を弱めて']},
    {q: '日本で最初に販売されたアイスクリームの値段はいくらでしょうか？', c: ['8000円', '5000円', '3000円', '800円']},
    {q: 'パンケーキの名前の由来は何でしょうか？', c: ['フライパンで調理するから', 'パン屋の一番人気メニューだから', '膨らみすぎてパンクするのに注意が必要だから', '名前の理由に関する記録は残っていない']},
  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  // question.textContent = quizSet[currentNum].q;

  function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li){
    if(isAnswered){
      return;
    }
    isAnswered = true;

    if(li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else{
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz(){
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1){
      btn.textContent = 'Show Socer';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')){
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length - 1){
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else{
      currentNum++;
      setQuiz();
    }
  })
}