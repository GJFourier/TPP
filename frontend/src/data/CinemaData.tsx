import { ICinema } from "../interface";
// import any = jasmine.any;

export const adminRegionData = [
    { id: 1, name: "Hà Nội" },
    { id: 2, name: "Hồ Chí Minh" },
    { id: 3, name: "Đà Nẵng" },
    { id: 4, name: "Hải Phòng" },
    { id: 5, name: "Cần Thơ" },
    { id: 6, name: "An Giang" }
];

export const cinemaData: ICinema[] = [
    {
        id: 1,
        name: "CGV Vincom Bà Triệu",
        location: "Tầng 6, Vincom Bà Triệu, 191 Bà Triệu, Quận Hai Bà Trưng, Hà Nội",
        image: "https://s3img.vcdn.vn/123phim/2018/09/cgv-vincom-ba-trieu-15379624326632.jpg",
        phone: "1900 6017",
        screenings: [],
        rating: 5
    },
    {
        id: 2,
        name: "CGV Vincom Center Nguyễn Chí Thanh",
        location: "Tầng 6, Vincom Center Nguyễn Chí Thanh, 54A Nguyễn Chí Thanh, Quận Đống Đa, Hà Nội",
        image: "https://s3img.vcdn.vn/123phim/2018/09/cgv-vincom-center-nguyen-chi-thanh-15379625011865.jpg",
        phone: "1900 6017",
        screenings: [],
        rating: 4

    },
    {
        id: 3,
        name: "CGV Vincom Mega Mall Royal City",
        location: "Tầng B1, Royal City, 72A Nguyễn Trãi, Thanh Xuân, Hà Nội",
        image: "https://s3img.vcdn.vn/123phim/2018/09/cgv-vincom-mega-mall-royal-city-15379625552015.jpg",
        phone: "1900 6017",
        screenings: [],
        rating: 3
    }
];