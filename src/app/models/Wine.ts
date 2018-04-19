import { CommentData } from "./CommentData";

export class Wine {
    comments: Array<CommentData>;
    id: number;
    country: string;
    description: string;
    points: number;
    price: number;
    province: string;
    taster_twitter_handle: string;
    title: string;
    winery: string;
    image: string;
}