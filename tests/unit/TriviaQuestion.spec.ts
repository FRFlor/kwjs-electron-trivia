import {shallowMount, Wrapper} from "@vue/test-utils";
import TriviaQuestion from "@/components/TriviaQuestion.vue";
import {ITrivia} from "@/types";

describe("TriviaQuestion", () => {
    it("Renders a given question", () => {
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

        const wrapper: Wrapper<TriviaQuestion> = shallowMount(TriviaQuestion, {
            propsData: {
                trivia,
            },
        });

        expect(wrapper.find(".question-prompt").text()).toEqual(trivia.question);
    });
});
