<template>
    <div class="trivia-question">
        <div class="question-prompt" v-text="trivia.question"/>
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
    .incorrect {
        background-color: hsl(0, 60%, 70%);
    }

    .correct {
        background-color: hsl(120, 60%, 70%);
    }
</style>
