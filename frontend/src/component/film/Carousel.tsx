import React from "react";
import { Carousel, Image } from "antd";

export function FilmCarousel() {
  return (
    <>
      <Carousel
        autoplay
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1000px",
          height: "500px",
        }}
      >
        <Image
          style={{
            flex: "1",
            height: "500px",
            width: "1000px",
            maxHeight: "100%",
          }}
          src="/Carousel/1.jpg"
        />
        <Image
          style={{
            flex: "1",
            height: "500px",
            width: "1000px",
            maxHeight: "100%",
          }}
          src="/Carousel/2.jpg"
        />
        <Image
          style={{
            flex: "1",
            height: "500px",
            width: "1000px",
            maxHeight: "100%",
          }}
          src="/Carousel/3.jpg"
        />
        <Image
          style={{
            flex: "1",
            height: "500px",
            width: "1000px",
            maxHeight: "100%",
          }}
          src="/Carousel/4.jpg"
        />
      </Carousel>
    </>
  );
}
