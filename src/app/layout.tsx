import { PrismicPreview } from "@prismicio/next";
import GlobalNav from "@/components/GlobalNav";
import { createClient, repositoryName } from "@/prismicio";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const globalNav = await client.getSingle("global_nav").catch(() => null);

  return (
    <html lang="en">
      <body>
        {globalNav ? (
          <GlobalNav navigation={globalNav.data} />
        ) : (
          <header>
            <nav aria-label="Global">
              <p style={{ margin: 0, padding: "1rem" }}>
                Global nav is not published yet.
              </p>
            </nav>
          </header>
        )}
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
