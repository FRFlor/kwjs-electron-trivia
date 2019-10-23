import {ITrivia} from "@/types/ITrivia";

export interface ITriviaGetResponse {
    response_code: number;
    results: ITrivia[];
}
