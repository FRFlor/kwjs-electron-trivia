<template>
    <div id="app">
        <trivia-question v-if="currentQuestion"
                         :trivia="currentQuestion"
                         @correct-answer="onQuestionAnswered"
                         @incorrect-answer="onQuestionAnswered"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TriviaQuestion from "@/components/TriviaQuestion.vue";
    import {ITrivia} from "@/types";
    import axios from "axios";
    import {ITriviaGetResponse} from "./types/ITriviaGetResponse";

    const decodeQuestion = (encoded: ITrivia): ITrivia => {
        return {
            category: atob(encoded.category),
            correct_answer: atob(encoded.correct_answer),
            difficulty: atob(encoded.difficulty),
            incorrect_answers: encoded.incorrect_answers.map((encodedAnswer: string): string => atob(encodedAnswer)),
            question: atob(encoded.question),
            type: atob(encoded.type),
        };
    };

    @Component({
        components: {
            TriviaQuestion
        },
    })
    export default class App extends Vue {
        private questions: ITrivia[] = [];
        private currentQuestionIndex: number = 0;

        async created() {
            try {
                const response = await axios.get<ITriviaGetResponse>(
                    "https://opentdb.com/api.php?amount=10&type=multiple&encode=base64"
                );

                this.questions = response.data.results.map(decodeQuestion);
            } catch (e) {
                console.error(e);
            }
        }

        private get currentQuestion(): ITrivia | null {
            if (this.questions.length === 0) {
                return null;
            }

            return this.questions[this.currentQuestionIndex];
        }

        private onQuestionAnswered(): void {
            setTimeout(() => this.currentQuestionIndex++, 1000);
        }
    }
</script>

<style lang="scss">
    html, body {
        margin: 0;
        background-color: lightseagreen;
    }

    #app {
        display: flex;
        padding-top: 2.5rem;
        justify-content: center;
        align-items: center;
    }
</style>
