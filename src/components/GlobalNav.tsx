import {type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type GlobalNavProps = {
  navigation: Content.GlobalNavDocument["data"];
};

export default function GlobalNav({ navigation }: GlobalNavProps) {
  const navItems = navigation.headerlink.flatMap((menuItem, itemIndex) =>
        [
      {
        key: `${itemIndex}`,
        field: menuItem,
        label: menuItem.text,
      },
    ]);

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
              <PrismicNextLink field={item.field}>{item.label}</PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
