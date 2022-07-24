export interface Meal {
    name?: string;
    type?: 'meatless' | 'chicken' | 'turkey' | 'other';
    rating?: number;
    source?: string;
    _id?: string;
}
