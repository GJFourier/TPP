import { List } from "antd";
import { ICinema } from "../../interface";
import React from "react";
import { CinemaCart } from "./CinemaCart";

interface ICinemaListProps {
  cinemaData: ICinema[];
}

export function CinemaList({ cinemaData }: ICinemaListProps) {
  const [pageSize, setPageSize] = React.useState<number>(4);

  return (
    <>
      <List
        // pagination={{ pageSize: pageSize }}
        pagination={{ hideOnSinglePage: true }}
        // footer={<></>}
        grid={{
          gutter: 4,
          column: 1,
        }}
        dataSource={cinemaData}
        renderItem={(item: ICinema) => (
          <List.Item>
            <CinemaCart cinema={item}></CinemaCart>
          </List.Item>
        )}
      />
    </>
  );
}
