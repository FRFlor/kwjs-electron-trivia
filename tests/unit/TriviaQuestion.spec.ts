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
});
