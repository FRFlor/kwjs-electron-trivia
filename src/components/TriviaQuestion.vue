<template>
    <div class="trivia-question">
        <div class="question-prompt" v-text="trivia.question"/>
        <div class="answers-container">
            <button class="possible-answer"
                    v-for="(answer, index) in possibleAnswers"
                    :key="index"
                    v-text="answer"
                    :content="answer"
                    :class="{
                    'incorrect': answerGiven === answer && answerGiven !== correctAnswer,
                    'correct': answerGiven && answer === correctAnswer
                    }"
                    @click="answerQuestion(answer)"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Watch, Prop, Vue} from "vue-property-decorator";
    import {ITrivia} from "@/types";

    @Component
    export default class TriviaQuestion extends Vue {
        @Prop({required: true}) private trivia!: ITrivia;

        private answerGiven: string = "";

        private get possibleAnswers(): string[] {
            const possibleAnswers = [...this.trivia.incorrect_answers];
            const indexOfRightAnswer: number = Math.floor(Math.random() * possibleAnswers.length);
            possibleAnswers.splice(indexOfRightAnswer, 0, this.trivia.correct_answer);

            return possibleAnswers;
        }

        private get correctAnswer(): string {
            return this.trivia.correct_answer;
        }

        private answerQuestion(answerGiven: string): void {
            this.answerGiven = answerGiven;
            const eventName: string = this.answerGiven === this.correctAnswer
                ? "correct-answer"
                : "incorrect-answer";

            this.$emit(eventName);
        }

        @Watch('trivia.question')
        private resetAnswer(): void {
            this.answerGiven = "";
        }
    }
</script>


<style lang="scss" scoped>
    .trivia-question {
        background-color: lightcyan;
        max-width: 30rem;
        border-radius: 0.75rem;
        display: flex;
        flex-direction: column;
        padding: 1rem;

        .question-prompt {
            font-size: 1.5rem;
            color: hsl(0, 0%, 21%);
            text-align: center;
        }
        .answers-container {
            margin-top: 2rem;
            .possible-answer {
                background-color: hsl(210, 80%, 46%);
                color: whitesmoke;
                min-width: 25rem;
                padding: 0.75rem;
                border-radius: 0.25rem;
                &:not(:first-child) {
                    margin-top: 0.5rem;
                }
                font-size: 1rem;

                &:hover {
                    cursor: pointer;
                    filter: brightness(120%);
                }

                &.correct {
                    background-color: forestgreen;
                }

                &.incorrect {
                    background-color: orangered;
                }
            }

            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>
