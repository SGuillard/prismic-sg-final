import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HeroGlobal`.
 */
export type HeroGlobalProps = SliceComponentProps<Content.HeroGlobalSlice>;

/**
 * Component for "HeroGlobal" Slices.
 */
const HeroGlobal: FC<HeroGlobalProps> = ({ slice }) => {
  const backgroundImage = isFilled.image(slice.primary.heromain)
    ? `url(${slice.primary.heromain.url})`
    : "none";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero-global"
      style={{ backgroundImage }}
    >
      <div className="hero-global__overlay">
        {isFilled.keyText(slice.primary.herotitle) && (
          <h1 className="hero-global__title">{slice.primary.herotitle}</h1>
        )}
      </div>
      <style>
        {`
          .hero-global {
            min-height: 70vh;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-color: #111827;
          }

          .hero-global__overlay {
            width: 100%;
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
            text-align: center;
            background: linear-gradient(
              rgba(0, 0, 0, 0.45),
              rgba(0, 0, 0, 0.45)
            );
          }

          .hero-global__title {
            margin: 0;
            color: #ffffff;
            font-size: clamp(2rem, 8vw, 6rem);
            line-height: 1.1;
            font-weight: 800;
            max-width: 18ch;
          }
        `}
      </style>
    </section>
  );
};

export default HeroGlobal;
