import { useState } from "react";

interface Chip {
  label: string;
  variant?: "solid" | "outlined";
}

interface ProductLink {
  label: string;
  href: string;
  primary?: boolean;
}

interface Product {
  name: string;
  tag: string;
  logo?: string;
  logoBg: string;
  chips: Chip[];
  detail: {
    description: string;
    links: ProductLink[];
  };
}

const products: Product[] = [
  {
    name: "Tab Nest",
    tag: "Free tab manager with Google Drive sync. Save, organize, and search your tabs — privacy-first.",
    logo: "/assets/tabNest_256.png",
    logoBg: "#1A56DB",
    chips: [
      { label: "browser extension" },
      { label: "open source", variant: "solid" },
    ],
    detail: {
      description:
        "A Chrome extension that saves and restores your tab sessions, syncs them to Google Drive, and lets you search across all your saved tabs — no account required, no data sold.",
      links: [
        {
          label: "Install from Chrome Web Store",
          href: "https://chromewebstore.google.com/detail/tab-nest/necndpocofifkmoekdgbocklmmnldegp",
          primary: true,
        },
        {
          label: "View source on GitHub",
          href: "https://github.com/offby1-tech/tabnest",
        },
      ],
    },
  },
];

function ProductRow({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article className="venture-article">
      <button
        className="venture-row"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="v-idx">[{index}]</span>
        <span className="v-logo" aria-hidden="true">
          {product.logo ? (
            <img src={product.logo} alt="" />
          ) : (
            <span
              className="v-logo-fallback"
              style={{ background: product.logoBg }}
            >
              {product.name[0]}
            </span>
          )}
        </span>
        <span>
          <span className="v-name">{product.name}</span>
          <br />
          <span className="v-tag">{product.tag}</span>
        </span>
        <span className="v-meta">
          {product.chips.map((c) => (
            <span
              key={c.label}
              className={"v-chip" + (c.variant ? ` ${c.variant}` : "")}
            >
              {c.label}
            </span>
          ))}
          <span className="toggle">{open ? "[−]" : "[+]"}</span>
        </span>
      </button>
      {open && (
        <div className="venture-detail">
          <p className="venture-detail-desc">{product.detail.description}</p>
          <div className="venture-detail-links">
            {product.detail.links.map((link) => (
              <a
                key={link.href}
                className={"btn " + (link.primary ? "btn-primary" : "btn-secondary")}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default function ProductList() {
  return (
    <div className="ventures">
      {products.map((p, i) => (
        <ProductRow key={p.name} product={p} index={i} />
      ))}
    </div>
  );
}
