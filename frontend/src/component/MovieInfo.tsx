//Movie info used in the seat selector and payment view.
import {Image, Space, Typography} from "antd";
import Title from "antd/es/typography/Title";
import "../css/MovieInfo.css"

export function MovieInfo(props:{filmImage:string,filmTitle:string,cinemaName:string,hallName:string}){
    const {filmImage,filmTitle,cinemaName,hallName}=props;
    return (
        <div className="movie-info">
            <div className="film-description">
                <Image src={filmImage} height={160} width={100} />
                <Title level={5}>{filmTitle}</Title>
                <Space direction="vertical">
                    <Typography.Text>{"影院：" + cinemaName}</Typography.Text>
                    <Typography.Text>{"影厅：" + hallName}</Typography.Text>
                </Space>
            </div>
        </div>
    )
}

