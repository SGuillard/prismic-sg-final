import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.image(slice.primary.hero_image) ? (
        <PrismicNextImage field={slice.primary.hero_image} />
      ) : null}
      {slice.primary.title ? <h1>{slice.primary.title}</h1> : null}
    </section>
  );
};

export default Hero;
