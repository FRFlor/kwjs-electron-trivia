import {shallowMount, Wrapper} from "@vue/test-utils";
import TriviaQuestion from "@/components/TriviaQuestion.vue";
import {ITrivia} from "@/types";

const trivia: ITrivia = {
    category: "Movies",
    correct_answer: "Movie that is correct",
    difficulty: "Easy",
    incorrect_answers: [
        "Wrong Movie 1",
        "Wrong Movie 2",
        "Wrong Movie 3",
    ],
    question: "What is the right movie?",
    type: "Multiple-choice",
};

const possibleAnswers: string[] = [...trivia.incorrect_answers, trivia.correct_answer];

describe("TriviaQuestion", () => {
    let wrapper: Wrapper<TriviaQuestion>;

    beforeEach(() => {
        wrapper = shallowMount(TriviaQuestion, {
            propsData: {
                trivia,
            },
        });
    });

    it("Renders a given question", () => {
        expect(wrapper.find(".question-prompt").text()).toEqual(trivia.question);
    });

    it("Renders one button for each possible answer of a given question", () => {
        expect(wrapper.findAll(".possible-answer")).toHaveLength(possibleAnswers.length);

        possibleAnswers.forEach((answer: string) => {
            expect(wrapper.find(`.possible-answer[content="${answer}"]`).exists()).toBe(true);
        });
    });

    it("Starts with no button having '.incorrect' or '.correct' highlights", () => {
        expect(wrapper.find(".possible-answer.incorrect").exists()).toBe(false);
        expect(wrapper.find(".possible-answer.correct").exists()).toBe(false);
    });

    it("Highlights the answer selected with '.incorrect' if the answer selected is wrong", () => {
        const incorrectAnswer: string = trivia.incorrect_answers[0];
        wrapper.find(`.possible-answer[content="${incorrectAnswer}"]`).trigger("click");

        expect(wrapper.find(`.possible-answer[content="${incorrectAnswer}"]`).classes("incorrect")).toBe(true);
    });

    it("Emits an 'incorrect-answer' event when the incorrect answer is given", () => {
        const incorrectAnswer: string = trivia.incorrect_answers[0];
        wrapper.find(`.possible-answer[content="${incorrectAnswer}"]`).trigger("click");

        expect(wrapper.emitted("incorrect-answer")).toBeTruthy();
    });

    it("Highlights the answer selected with '.correct' if the answer selected is right", () => {
        const correctAnswer: string = trivia.correct_answer;
        wrapper.find(`.possible-answer[content="${correctAnswer}"]`).trigger("click");

        expect(wrapper.find(`.possible-answer[content="${correctAnswer}"]`).classes("correct")).toBe(true);
    });

    it("Highlights the correct answer with '.correct' when an incorrect answer is given", () => {
        const incorrectAnswer: string = trivia.incorrect_answers[0];
        wrapper.find(`.possible-answer[content="${incorrectAnswer}"]`).trigger("click");

        expect(wrapper.find(`.possible-answer[content="${trivia.correct_answer}"]`).classes("correct")).toBe(true);
    });

    it("Emits an 'correct-answer' event when the correct answer is given", () => {
        const correctAnswer: string = trivia.correct_answer;
        wrapper.find(`.possible-answer[content="${correctAnswer}"]`).trigger("click");

        expect(wrapper.emitted("correct-answer")).toBeTruthy();
    });
});
