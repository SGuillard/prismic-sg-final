import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type GlobalNavProps = {
  navigation: Content.GlobalNavDocument["data"];
};

const navItems: Array<{
  key: keyof Content.GlobalNavDocument["data"];
  label: string;
}> = [
  { key: "blog", label: "Blog" },
  { key: "contact", label: "Contact" },
];

export default function GlobalNav({ navigation }: GlobalNavProps) {
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
          {navItems.map((item) => {
            const linkField = navigation[item.key];

            if (!isFilled.link(linkField)) {
              return null;
            }

            return (
              <li key={item.key}>
                <PrismicNextLink field={linkField}>
                  {linkField.text || item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
