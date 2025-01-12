export interface ICardComponentProps<T> {
    data: T;
    linkPath: (item: T) => string;
    title: (item: T) => string;
    image: (item: T) => string;
};