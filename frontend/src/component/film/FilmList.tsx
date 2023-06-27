import React, {useEffect, useState} from "react";
import {FilmCart} from "./FilmCart";
import {IFilm} from "../../interface";
import {List} from "antd";

interface IFilmListProps {
    fileDate: IFilm[];
    filmType: string;
    ifShowAll?: boolean;
}

export function FilmList({fileDate, filmType, ifShowAll}: IFilmListProps) {
    const [pageSize, setPageSize] = useState<number>(8);

    useEffect(() => {
        if (ifShowAll) {
            setPageSize(fileDate.length);
        } else {
            setPageSize(8);
        }
    }, [ifShowAll]);

    return (
        <>
            <List
                // pagination={{ pageSize: pageSize }}
                pagination={fileDate.length > pageSize ? {pageSize: pageSize} : false}
                // footer={<></>}
                grid={{
                    gutter: 56,
                    column: 4,
                }}
                dataSource={fileDate}
                renderItem={(item: IFilm) => (
                    <List.Item>
                        <FilmCart film={item} type={filmType}></FilmCart>
                    </List.Item>
                )}
            />
        </>
    );
}
