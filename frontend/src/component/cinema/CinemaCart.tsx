import { Button, Card, Image } from "antd";
import { ICinema } from "../../interface";
import { Link } from "react-router-dom";

interface ICinemaCartProps {
  cinema: ICinema;
}

export function CinemaCart({ cinema }: ICinemaCartProps) {
  return (
    <>
      <Card
        hoverable
        cover={
          <Image
            alt="image"
            style={{ width: 300, height: 200 }}
            src={cinema.image}
          />
        }
        style={{
          display: "flex",
        }}
      >
        <div>
          <h3>{cinema.name}</h3>
          <h4>{"地址:" + cinema.location}</h4>
          <h4>{"电话:" + cinema.phone}</h4>
        </div>
        <Link to={`${cinema.id}`}>
          <Button danger>选购</Button>
        </Link>
      </Card>
    </>
  );
}
