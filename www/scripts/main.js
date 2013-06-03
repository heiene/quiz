/**
 * Created with JetBrains WebStorm.
 * User: rykket
 * Date: 5/29/13
 * Time: 5:22 PM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
$('.loadingstate').text("");

    var answers = [];
    var correctAnswers = [];
    var whichQuestion = 0;
    var question = 0;
    var allQuestions = [{Question: "Who let the dogs out", alternatives: ["you", "me", "santa claus", "dog wisperer"],correctAnswer:3 },
        {Question: "Kven kan segla for uten vind" , alternatives: ["du","eg","ho", "he", "hon"],correctAnswer:1 },
        {Question: "Hva er kvadratroten av Pi^2" , alternatives: [3.14, 5, "PI","0","i"],correctAnswer:2 },
        {Question: "Hvor er alle helter hen?" , alternatives: ["hos jan eggum", "staatt opp igjen?", "paa kino"],correctAnswer:2 },
        {Question: "Hva skjer a" , alternatives: ["tingelign", "bagera","yo", "baloo"],correctAnswer:1 },
        {Question: "Why oh why didn't i take the blue pill?" , alternatives: ["to see the rabbit hole","good question", "nobody knows"],correctAnswer:0 }];
    var numberOfQuestions = allQuestions.length;
    for(var ans in allQuestions ) {
        correctAnswers.push(allQuestions[ans].correctAnswer);
    }
    console.log(correctAnswers);

    $('#startButton').on('click', function() {
        $(this).remove();
        displayQuestion(0);
        $('#nextButton').animate({opacity: 1}, 'slow');
        $('.question').animate({opacity: 1}, 'slow');
    })
    $('#nextButton').on('click', function(){
        checkAnswer();
        displayQuestion(1);

    });
    $('#prevButton').on('click', function(){
        answers.pop();
        displayQuestion(-1);

    });


    function checkAnswer() {

        for (var i = 0, len = $('.alternatives').find('li').length; i < len ; i++) {
            var alt = '#alt'+(i);
            var node =   $(alt).is(':checked');
            if(node) {
                return answers.push(i);
            }
        }

    }
    function displayQuestion(n){
        whichQuestion += n;

        if (whichQuestion > 0 && whichQuestion < (numberOfQuestions)) {
            $('#prevButton').animate({opacity: 1}, 'slow');
            $('#nextButton').animate({opacity: 1}, 'slow');
        }
        if (whichQuestion === (numberOfQuestions) ) {
            $('#nextButton').animate({opacity: 0}, 'slow');
        }

        if (whichQuestion === (numberOfQuestions-1) ) {
            $('#nextButton').text('Finish?');
        }

        console.log("kommer jeg hit?", whichQuestion, numberOfQuestions);
        if(whichQuestion >= numberOfQuestions) {
            whichQuestion = numberOfQuestions;

            return displayAnswers();
        }
        if(whichQuestion <= 0 ) {
            whichQuestion = 0;
        }
        return displayNextQuestion(whichQuestion)

    }

    function displayNextQuestion(q) {
        $('.question').text('');
//        console.log("Men kommer jeg hit?",showAlternatives(allQuestions[q]));
        $('.question').append(allQuestions[q].Question);
        var alternatives = $('.alternatives').text('')
        for (var i = 0,numberOfAlternatives = allQuestions[q].alternatives.length ; i<numberOfAlternatives; i++) {

            alternatives.append('<li><input id = "alt'+i+'" type="radio" class="radiobutton" name="quiz"><label for = "alt'+i+'">'+allQuestions[q].alternatives[i]+'</label></li>');

        }

        $
    }

   

    function showAlternatives(obj) {
        return JSON.stringify(obj, null, '\t');
    };
    function displayAnswers(){
        var score = 0;
                 console.log("Answers are!",answers);
                console.log("Correct answers are", correctAnswers);
        for (var i = 0, len = answers.length; i<len; i++) {
            if (answers[i] === correctAnswers[i]) {
                score++;
            }
        }

        $('.not_answers').remove();
        $('body').append('<div class = "answer">You had: '+score+' correct answers</div>');

    }


});

