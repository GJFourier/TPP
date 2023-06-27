export interface IFilm {
    id: number;
    name: string;
    description: string;
    duration: number;
    rating: number;
    releaseDate: Date;
    price: number;
    image: string;
    region: string;
}

export interface IUser {
    id: number;
    username: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    avatar: string | null;
    description: string | null;
}

export interface IOrder {
    id: number;
    time: Date;
    filmName: string;
    filmImage: string;
    cinemaName: string;
    seats: Array<ISeat>;
    customText: Map<number, string>;
    price: number;
    canCancel: boolean;
}

export interface ICinema {
    id: number;
    name: string;
    location: string;
    screenings: Array<IScreening>;
    rating: number;
    image: string;
    phone: string;
}

export interface IScreening {
    id: number;
    seatOccupation: Set<number>;
    startTime: Date;
    endTime: Date;
    price: number;
    filmId: number;
    filmTitle: string;
    filmImage: string;
    cinemaId: number;
    cinemaName: string;
    hallId: number;
    hallName: string;
}

export interface IScreeningDTO {
    id: number;
    // seatOccupation: Set<number>;
    startTime: Date;
    endTime: Date;
    price: number;
    filmId: number;
    filmTitle: string;
    filmImage: string;
    cinemaId: number;
    cinemaName: string;
    hallId: number;
    hallName: string;
}

export interface IHall {
    id: number;
    name: string;
    seats: Array<Array<ISeat | null>>;
}

export interface ISeat {
    id: number;
    name: string;
}

export interface IOrderToPay {
    totalPrice: number;
    screening: IScreening;
    seats: ISeat[];
}

export interface ISeatDTO {
    id: number;
    seatRow: number;
    seatColumn: number;
    isSold: boolean;
}

export interface IOrderInfo {
    screeningId: number;
    userId: number;
    seatIds: number[];
}
