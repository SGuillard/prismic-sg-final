import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type GlobalNavProps = {
  navigation: Content.GlobalNavDocument["data"];
};

export default function GlobalNav({ navigation }: GlobalNavProps) {
  const navItems = Object.entries(navigation).flatMap(([key, field]) => {
    if (!isFilled.link(field)) {
      return [];
    }

    return [
      {
        key,
        field,
        label: key
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      },
    ];
  });

  return (
    <header>
      <nav aria-label="Global">
        <ul
          style={{
            display: "flex",
            gap: "1rem",
            listStyle: "none",
            margin: 0,
            padding: "1rem",
          }}
        >
          {navItems.map((item) => (
            <li key={item.key}>
              <PrismicNextLink field={item.field}>
                {item.field.text || item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
